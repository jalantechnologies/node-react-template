#!/usr/bin/env ts-node

/**
 * Architecture Review Script
 *
 * This script analyzes the codebase for architectural violations
 * and generates a detailed report.
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface Violation {
  file: string;
  line?: number;
  rule: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
}

const violations: Violation[] = [];

/**
 * Find all TypeScript files in a directory
 */
function findTSFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('dist')) {
        findTSFiles(filePath, fileList);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Check for database queries without indexes
 */
function checkDatabaseIndexes(files: string[]) {
  const schemaFiles = files.filter(f => f.includes('-db.ts'));

  schemaFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');

    // Find reference fields without indexes
    const refFieldRegex = /(\w+):\s*\{[^}]*ref:\s*['"](\w+)['"][^}]*\}/g;
    let match;

    while ((match = refFieldRegex.exec(content)) !== null) {
      const fieldDef = match[0];
      const fieldName = match[1];

      if (!fieldDef.includes('index:')) {
        violations.push({
          file,
          rule: 'BE-002',
          severity: 'critical',
          message: `Missing index on reference field "${fieldName}". Add "index: true" to improve query performance.`,
        });
      }
    }
  });
}

/**
 * Check for module independence violations
 */
function checkModuleIndependence(files: string[]) {
  const moduleFiles = files.filter(f => f.includes('src/apps/backend/modules/'));

  moduleFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');

    // Extract current module
    const moduleMatch = file.match(/modules\/([^\/]+)\//);
    if (!moduleMatch) return;
    const currentModule = moduleMatch[1];

    // Check for imports from other modules' internals
    const importRegex = /from\s+['"]backend\/modules\/([^\/]+)\/internal/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const importedModule = match[1];
      if (importedModule !== currentModule) {
        violations.push({
          file,
          rule: 'BE-001',
          severity: 'critical',
          message: `Module independence violation: importing from "${importedModule}/internal/*". Use public API instead.`,
        });
      }
    }
  });
}

/**
 * Check for N+1 query patterns
 */
function checkN1Patterns(files: string[]) {
  const backendFiles = files.filter(f => f.includes('src/apps/backend/'));

  backendFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');

    // Check for loops with await Repository
    const loopAwaitRegex = /for\s*\([^)]+\)\s*\{[^}]*await\s+\w+Repository/gs;
    if (loopAwaitRegex.test(content)) {
      violations.push({
        file,
        rule: 'BE-007',
        severity: 'critical',
        message: 'Potential N+1 query pattern: loop contains await Repository call. Use batch queries instead.',
      });
    }

    // Check for Promise.all with map
    const promiseAllMapRegex = /Promise\.all\([^)]*\.map\([^)]*Repository/gs;
    if (promiseAllMapRegex.test(content)) {
      violations.push({
        file,
        rule: 'BE-007',
        severity: 'medium',
        message: 'Possible N+1 pattern: using Promise.all with map. Consider using $in query instead.',
      });
    }
  });
}

/**
 * Check for business logic in controllers
 */
function checkBusinessLogicLocation(files: string[]) {
  const controllerFiles = files.filter(f => f.includes('-controller.ts'));

  controllerFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');

    // Check for Repository imports in controllers
    if (content.includes('Repository')) {
      violations.push({
        file,
        rule: 'BE-005',
        severity: 'critical',
        message: 'Controller accessing Repository directly. Move database access to Service layer.',
      });
    }

    // Check for validation logic
    if (content.match(/if\s*\([^)]*\.length\s*[<>]/)) {
      violations.push({
        file,
        rule: 'BE-005',
        severity: 'medium',
        message: 'Possible validation logic in controller. Move to Service layer.',
      });
    }
  });
}

/**
 * Check for inline styles in React components
 */
function checkInlineStyles(files: string[]) {
  const componentFiles = files.filter(f => f.endsWith('.tsx'));

  componentFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');

    const inlineStyleRegex = /style\s*=\s*\{\{/g;
    const matches = content.match(inlineStyleRegex);

    if (matches && matches.length > 0) {
      violations.push({
        file,
        rule: 'FE-001',
        severity: 'high',
        message: `Found ${matches.length} inline style(s). Use Tailwind classes instead.`,
      });
    }
  });
}

/**
 * Check for direct API calls in components
 */
function checkAPIServiceLayer(files: string[]) {
  const componentFiles = files.filter(
    f => f.includes('src/apps/frontend/') && f.endsWith('.tsx') && !f.includes('service')
  );

  componentFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');

    // Check for axios imports
    if (content.includes("from 'axios'") || content.includes('from "axios"')) {
      violations.push({
        file,
        rule: 'FE-004',
        severity: 'critical',
        message: 'Direct axios import in component. Use service layer for API calls.',
      });
    }

    // Check for fetch calls
    if (content.includes('fetch(')) {
      violations.push({
        file,
        rule: 'FE-004',
        severity: 'critical',
        message: 'Direct fetch() call in component. Use service layer for API calls.',
      });
    }
  });
}

/**
 * Check for generic error usage
 */
function checkErrorHandling(files: string[]) {
  const backendFiles = files.filter(
    f => f.includes('src/apps/backend/') && !f.includes('.spec.ts')
  );

  backendFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');

    const genericErrorRegex = /throw new Error\(/g;
    const matches = content.match(genericErrorRegex);

    if (matches && matches.length > 0) {
      violations.push({
        file,
        rule: 'BE-009',
        severity: 'high',
        message: 'Using generic Error. Use typed error classes extending ApplicationError.',
      });
    }
  });
}

/**
 * Check test coverage
 */
function checkTestCoverage(files: string[]) {
  const serviceFiles = files.filter(f => f.includes('-service.ts') && !f.includes('.spec.ts'));

  serviceFiles.forEach(serviceFile => {
    const testFile = serviceFile.replace('src/', 'test/').replace('.ts', '.spec.ts');

    if (!fs.existsSync(testFile)) {
      violations.push({
        file: serviceFile,
        rule: 'TEST-001',
        severity: 'high',
        message: 'Service file missing corresponding test file.',
      });
    }
  });
}

/**
 * Generate report
 */
function generateReport() {
  const criticalCount = violations.filter(v => v.severity === 'critical').length;
  const highCount = violations.filter(v => v.severity === 'high').length;
  const mediumCount = violations.filter(v => v.severity === 'medium').length;
  const lowCount = violations.filter(v => v.severity === 'low').length;

  let report = '# Architecture Review Report\n\n';
  report += `**Generated:** ${new Date().toISOString()}\n\n`;
  report += `## Summary\n\n`;
  report += `- 🚨 Critical: ${criticalCount}\n`;
  report += `- ⚠️ High: ${highCount}\n`;
  report += `- ⚠️ Medium: ${mediumCount}\n`;
  report += `- ℹ️ Low: ${lowCount}\n`;
  report += `- **Total:** ${violations.length}\n\n`;

  if (violations.length === 0) {
    report += '✅ **No violations found!**\n';
    return report;
  }

  // Group by severity
  const bySeverity = {
    critical: violations.filter(v => v.severity === 'critical'),
    high: violations.filter(v => v.severity === 'high'),
    medium: violations.filter(v => v.severity === 'medium'),
    low: violations.filter(v => v.severity === 'low'),
  };

  Object.entries(bySeverity).forEach(([severity, items]) => {
    if (items.length === 0) return;

    const icon = severity === 'critical' ? '🚨' : severity === 'high' ? '⚠️' : 'ℹ️';
    report += `## ${icon} ${severity.toUpperCase()} (${items.length})\n\n`;

    items.forEach(violation => {
      report += `### ${violation.rule}: ${violation.file}\n\n`;
      report += `${violation.message}\n\n`;
    });
  });

  return report;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Running architecture review...\n');

  const srcDir = path.join(__dirname, '..', 'src');
  const files = findTSFiles(srcDir);

  console.log(`Found ${files.length} TypeScript files\n`);

  console.log('Checking database indexes...');
  checkDatabaseIndexes(files);

  console.log('Checking module independence...');
  checkModuleIndependence(files);

  console.log('Checking N+1 patterns...');
  checkN1Patterns(files);

  console.log('Checking business logic location...');
  checkBusinessLogicLocation(files);

  console.log('Checking inline styles...');
  checkInlineStyles(files);

  console.log('Checking API service layer...');
  checkAPIServiceLayer(files);

  console.log('Checking error handling...');
  checkErrorHandling(files);

  console.log('Checking test coverage...');
  checkTestCoverage(files);

  console.log('\n📊 Generating report...\n');

  const report = generateReport();

  // Write to file
  fs.writeFileSync('architecture-violations.md', report);

  // Print to console
  console.log(report);

  // Exit with error code if critical violations found
  const criticalCount = violations.filter(v => v.severity === 'critical').length;
  if (criticalCount > 0) {
    console.error(`\n❌ Found ${criticalCount} critical violation(s)\n`);
    process.exit(1);
  } else {
    console.log('\n✅ No critical violations found\n');
    process.exit(0);
  }
}

main();
