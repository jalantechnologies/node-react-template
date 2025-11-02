import { danger, warn, fail, message, markdown } from 'danger';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Automated PR Review using Danger.js
 *
 * This file contains automated checks based on the PR review rules
 * defined in .github/pr-review-rules.md
 */

// Helpers
const modifiedFiles = danger.git.modified_files;
const createdFiles = danger.git.created_files;
const allFiles = [...modifiedFiles, ...createdFiles];
const backendFiles = allFiles.filter(f => f.includes('src/apps/backend/'));
const frontendFiles = allFiles.filter(f => f.includes('src/apps/frontend/'));
const testFiles = allFiles.filter(f => f.includes('.spec.ts') || f.includes('.test.ts'));

/**
 * PR Description Check
 */
if (!danger.github.pr.body || danger.github.pr.body.length < 10) {
  fail('Please add a description to your PR explaining the changes.');
}

/**
 * GENERAL PROGRAMMING PRINCIPLES
 */

// GP-002: Naming Conventions
function checkNamingConventions(file: string, content: string) {
  const violations: string[] = [];

  // Check for bad variable names
  const badVarNames = /const\s+(data|temp|tmp|val|result|stuff|thing)\s*=/g;
  const matches = content.matchAll(badVarNames);
  for (const match of matches) {
    violations.push(`❌ **GP-002**: Generic variable name \`${match[1]}\` in \`${file}\``);
  }

  // Check for bad function names
  const badFuncNames = /function\s+(handler|process|doStuff|handle)\s*\(/g;
  const funcMatches = content.matchAll(badFuncNames);
  for (const match of funcMatches) {
    violations.push(`❌ **GP-002**: Generic function name \`${match[1]}\` in \`${file}\``);
  }

  return violations;
}

// GP-003: Function Size
function checkFunctionSize(file: string, content: string) {
  const violations: string[] = [];

  // Find function declarations
  const functionRegex = /(?:function|const)\s+\w+\s*=?\s*(?:async\s*)?\([^)]*\)\s*(?::.*?)?\s*(?:=>)?\s*{/g;
  const functions = content.matchAll(functionRegex);

  for (const func of functions) {
    const startIndex = func.index!;
    let braceCount = 1;
    let endIndex = startIndex + func[0].length;

    // Find matching closing brace
    for (let i = endIndex; i < content.length && braceCount > 0; i++) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
      if (braceCount === 0) {
        endIndex = i;
        break;
      }
    }

    const functionBody = content.substring(startIndex, endIndex);
    const lineCount = functionBody.split('\n').length;

    if (lineCount > 50) {
      violations.push(
        `⚠️ **GP-003**: Function in \`${file}\` is ${lineCount} lines long (max 50). ` +
        `Consider breaking it into smaller functions.`
      );
    }
  }

  return violations;
}

// GP-007: Proper Encapsulation - Check for utility files with domain logic
function checkUtilFiles(file: string) {
  const violations: string[] = [];

  if (file.includes('util') && !file.includes('internal')) {
    violations.push(
      `⚠️ **GP-007**: Utility file detected: \`${file}\`. ` +
      `Ensure it contains only pure functions, not domain logic. ` +
      `Domain logic should be encapsulated in appropriate classes.`
    );
  }

  return violations;
}

/**
 * BACKEND RULES
 */

// BE-001: Module Independence - Check for internal imports
function checkModuleIndependence(file: string, content: string) {
  const violations: string[] = [];

  // Extract module name from file path
  const moduleMatch = file.match(/modules\/([^\/]+)\//);
  if (!moduleMatch) return violations;

  const currentModule = moduleMatch[1];

  // Check for imports from other modules' internals
  const internalImportRegex = /from ['"]backend\/modules\/([^\/]+)\/internal/g;
  const imports = content.matchAll(internalImportRegex);

  for (const match of imports) {
    const importedModule = match[1];
    if (importedModule !== currentModule) {
      violations.push(
        `🚨 **BE-001 [CRITICAL]**: Module independence violation in \`${file}\`.\n` +
        `  - Importing from \`${importedModule}/internal/*\`\n` +
        `  - Use public API exports from \`backend/modules/${importedModule}\` instead.`
      );
    }
  }

  return violations;
}

// BE-002: Database Index Requirements
function checkDatabaseIndexes(file: string, content: string) {
  const violations: string[] = [];

  // Find schema definitions
  if (file.includes('-db.ts') && content.includes('new Schema')) {
    // Extract field definitions
    const fieldRegex = /(\w+):\s*{[^}]*type:\s*[^,}]+[^}]*}/g;
    const fields = content.matchAll(fieldRegex);

    for (const field of fields) {
      const fieldDef = field[0];
      const fieldName = field[1];

      // Check if field is used in queries (ref field)
      if (fieldDef.includes('ref:') && !fieldDef.includes('index:')) {
        violations.push(
          `🚨 **BE-002 [CRITICAL]**: Missing index on reference field \`${fieldName}\` in \`${file}\`.\n` +
          `  - Add \`index: true\` to improve query performance.`
        );
      }
    }
  }

  return violations;
}

// BE-004: CRUD-Based API Design
function checkAPIDesign(file: string, content: string) {
  const violations: string[] = [];

  if (file.includes('-router.ts')) {
    // Check for verb-based routes
    const verbRoutes = /router\.(get|post|patch|put|delete)\s*\(\s*['"]\/(\w+)['"]/g;
    const routes = content.matchAll(verbRoutes);

    const badVerbs = ['signup', 'login', 'send', 'process', 'handle', 'create', 'update', 'delete'];

    for (const route of routes) {
      const routePath = route[2];
      if (badVerbs.some(verb => routePath.toLowerCase().includes(verb))) {
        violations.push(
          `⚠️ **BE-004**: Non-CRUD route detected in \`${file}\`: \`/${routePath}\`.\n` +
          `  - Consider using resource-based naming (e.g., POST /accounts instead of POST /signup).`
        );
      }
    }
  }

  return violations;
}

// BE-005: Business Logic Outside Execution Context
function checkBusinessLogicLocation(file: string, content: string) {
  const violations: string[] = [];

  if (file.includes('-controller.ts')) {
    // Check if controller has Repository imports (bad)
    if (content.includes('Repository')) {
      violations.push(
        `🚨 **BE-005 [CRITICAL]**: Controller accessing Repository directly in \`${file}\`.\n` +
        `  - Move database access to Service layer.`
      );
    }

    // Check for validation logic in controllers
    if (content.match(/if\s*\([^)]*\.length\s*[<>]/)) {
      violations.push(
        `⚠️ **BE-005**: Possible validation logic in controller \`${file}\`.\n` +
        `  - Move validation to Service layer.`
      );
    }
  }

  return violations;
}

// BE-007: N+1 Query Pattern
function checkN1Pattern(file: string, content: string) {
  const violations: string[] = [];

  // Check for loops with await
  const loopWithAwaitRegex = /for\s*\([^)]+\)\s*{[^}]*await\s+\w+Repository/gs;
  if (loopWithAwaitRegex.test(content)) {
    violations.push(
      `🚨 **BE-007 [CRITICAL]**: Potential N+1 query pattern in \`${file}\`.\n` +
      `  - Loop contains \`await Repository\` call.\n` +
      `  - Use batch queries or \`.populate()\` instead.`
    );
  }

  // Check for Promise.all with map
  const promiseAllMapRegex = /Promise\.all\([^)]*\.map\([^)]*Repository/gs;
  if (promiseAllMapRegex.test(content)) {
    violations.push(
      `⚠️ **BE-007**: Possible N+1 pattern using Promise.all in \`${file}\`.\n` +
      `  - Consider using \`{ $in: ids }\` query instead of individual fetches.`
    );
  }

  return violations;
}

// BE-009: Proper Error Handling
function checkErrorHandling(file: string, content: string) {
  const violations: string[] = [];

  if (file.includes('backend/') && !file.includes('.spec.ts')) {
    // Check for generic Error usage
    const genericErrorRegex = /throw new Error\(/g;
    if (genericErrorRegex.test(content)) {
      violations.push(
        `⚠️ **BE-009**: Generic Error thrown in \`${file}\`.\n` +
        `  - Use typed error classes extending \`ApplicationError\`.`
      );
    }
  }

  return violations;
}

/**
 * FRONTEND RULES
 */

// FE-001: No Inline Styling
function checkInlineStyling(file: string, content: string) {
  const violations: string[] = [];

  if (file.endsWith('.tsx')) {
    const inlineStyleRegex = /style\s*=\s*\{\{/g;
    const matches = content.matchAll(inlineStyleRegex);
    let count = 0;
    for (const _ of matches) count++;

    if (count > 0) {
      violations.push(
        `⚠️ **FE-001**: Inline styles detected (${count} occurrences) in \`${file}\`.\n` +
        `  - Use Tailwind classes or styled components instead.`
      );
    }
  }

  return violations;
}

// FE-002: No Component Style Overrides
function checkStyleOverrides(file: string, content: string) {
  const violations: string[] = [];

  if (file.endsWith('.tsx')) {
    // Check for ! (important) in className
    const importantRegex = /className\s*=\s*["{].*!.*["}]/g;
    const matches = content.matchAll(importantRegex);
    let count = 0;
    for (const _ of matches) count++;

    if (count > 0) {
      violations.push(
        `⚠️ **FE-002**: Style overrides using \`!\` detected (${count} occurrences) in \`${file}\`.\n` +
        `  - Add proper variant props to components instead of overriding styles.`
      );
    }
  }

  return violations;
}

// FE-004: API Service Layer
function checkAPIServiceLayer(file: string, content: string) {
  const violations: string[] = [];

  if (file.includes('frontend/') && file.endsWith('.tsx')) {
    // Check for direct axios imports in components
    if (content.includes("from 'axios'") || content.includes('from "axios"')) {
      violations.push(
        `🚨 **FE-004 [CRITICAL]**: Direct axios import in component \`${file}\`.\n` +
        `  - Use service layer (extend \`APIService\`) for API calls.`
      );
    }

    // Check for fetch calls
    if (content.includes('fetch(')) {
      violations.push(
        `🚨 **FE-004 [CRITICAL]**: Direct \`fetch()\` call in component \`${file}\`.\n` +
        `  - Use service layer for API calls.`
      );
    }
  }

  return violations;
}

// FE-005: No Multiple Network Calls for List Items
function checkMultipleNetworkCalls(file: string, content: string) {
  const violations: string[] = [];

  if (file.endsWith('.tsx')) {
    // Check for .map with components that might fetch data
    const mapWithPropsRegex = /\.map\([^)]*=>\s*<\w+[^>]*\s+\w+Id\s*=/g;
    if (mapWithPropsRegex.test(content)) {
      violations.push(
        `⚠️ **FE-005**: Possible per-item data fetching pattern in \`${file}\`.\n` +
        `  - Ensure list data is fetched at parent level, not per item.`
      );
    }
  }

  return violations;
}

// FE-007: Type Safety
function checkTypeSafety(file: string, content: string) {
  const violations: string[] = [];

  if ((file.endsWith('.tsx') || file.endsWith('.ts')) && file.includes('frontend/')) {
    // Check for any type usage
    const anyTypeRegex = /:\s*any\b/g;
    const matches = content.matchAll(anyTypeRegex);
    let count = 0;
    for (const _ of matches) count++;

    if (count > 0) {
      violations.push(
        `⚠️ **TS-001**: \`any\` type used (${count} occurrences) in \`${file}\`.\n` +
        `  - Use proper types, \`unknown\`, or generics instead.`
      );
    }
  }

  return violations;
}

/**
 * TESTING REQUIREMENTS
 */

// TEST-001 & TEST-002: Check for test files
function checkTestCoverage() {
  const violations: string[] = [];

  // Check if service files have corresponding tests
  const serviceFiles = allFiles.filter(f => f.includes('-service.ts') && !f.includes('.spec.ts'));

  for (const serviceFile of serviceFiles) {
    const testFile = serviceFile.replace('.ts', '.spec.ts');
    const testFileAlt = serviceFile.replace('src/', 'test/').replace('.ts', '.spec.ts');

    const hasTest = allFiles.includes(testFile) || allFiles.includes(testFileAlt);

    if (!hasTest && modifiedFiles.includes(serviceFile)) {
      violations.push(
        `⚠️ **TEST-001**: Modified service file \`${serviceFile}\` may need updated tests.\n` +
        `  - Ensure tests exist in \`test/**/*.spec.ts\`.`
      );
    }
  }

  // Check if router files have tests
  const routerFiles = allFiles.filter(f => f.includes('-router.ts') && !f.includes('.spec.ts'));

  for (const routerFile of routerFiles) {
    if (modifiedFiles.includes(routerFile)) {
      violations.push(
        `⚠️ **TEST-002**: Modified router file \`${routerFile}\`.\n` +
        `  - Ensure API integration tests exist for all endpoints.`
      );
    }
  }

  return violations;
}

/**
 * RUN ALL CHECKS
 */
async function runReview() {
  const allViolations: string[] = [];

  for (const file of allFiles) {
    if (!file.endsWith('.ts') && !file.endsWith('.tsx')) continue;

    try {
      const content = fs.readFileSync(file, 'utf8');

      // General checks
      allViolations.push(...checkNamingConventions(file, content));
      allViolations.push(...checkFunctionSize(file, content));
      allViolations.push(...checkUtilFiles(file));

      // Backend checks
      if (backendFiles.includes(file)) {
        allViolations.push(...checkModuleIndependence(file, content));
        allViolations.push(...checkDatabaseIndexes(file, content));
        allViolations.push(...checkAPIDesign(file, content));
        allViolations.push(...checkBusinessLogicLocation(file, content));
        allViolations.push(...checkN1Pattern(file, content));
        allViolations.push(...checkErrorHandling(file, content));
      }

      // Frontend checks
      if (frontendFiles.includes(file)) {
        allViolations.push(...checkInlineStyling(file, content));
        allViolations.push(...checkStyleOverrides(file, content));
        allViolations.push(...checkAPIServiceLayer(file, content));
        allViolations.push(...checkMultipleNetworkCalls(file, content));
      }

      // TypeScript checks (both)
      allViolations.push(...checkTypeSafety(file, content));

    } catch (error) {
      // File might be deleted or binary
      continue;
    }
  }

  // Test coverage checks
  allViolations.push(...checkTestCoverage());

  return allViolations;
}

/**
 * MAIN EXECUTION
 */
(async () => {
  const violations = await runReview();

  if (violations.length === 0) {
    message('✅ No architecture or coding standard violations detected!');
    return;
  }

  // Group violations by severity
  const critical = violations.filter(v => v.includes('[CRITICAL]'));
  const warnings = violations.filter(v => !v.includes('[CRITICAL]'));

  if (critical.length > 0) {
    fail(`Found ${critical.length} critical violation(s) that must be fixed before merging.`);
  }

  if (warnings.length > 0) {
    warn(`Found ${warnings.length} warning(s) that should be addressed.`);
  }

  // Create summary
  let summary = '## 🤖 Automated Code Review\n\n';
  summary += `**Total Issues:** ${violations.length}\n`;
  summary += `- 🚨 Critical: ${critical.length}\n`;
  summary += `- ⚠️ Warnings: ${warnings.length}\n\n`;

  if (critical.length > 0) {
    summary += '### 🚨 Critical Issues (Must Fix)\n\n';
    critical.forEach(v => {
      summary += v + '\n\n';
    });
  }

  if (warnings.length > 0) {
    summary += '### ⚠️ Warnings (Should Fix)\n\n';
    warnings.forEach(v => {
      summary += v + '\n\n';
    });
  }

  summary += '\n---\n';
  summary += '📖 See [PR Review Rules](.github/pr-review-rules.md) for detailed guidelines.\n';

  markdown(summary);

  // Save to file for GitHub Actions
  fs.writeFileSync('architecture-violations.md', summary);
})();
