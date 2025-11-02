/**
 * Custom ESLint Rules for Architecture Enforcement
 *
 * These rules enforce the architectural patterns defined in .github/pr-review-rules.md
 */

module.exports = {
  rules: {
    'no-internal-imports': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Prevent importing from internal directories of other modules',
          category: 'Architecture',
          recommended: true,
        },
        messages: {
          noInternalImports:
            'Do not import from internal directories of other modules. Use public API from index.ts instead. (BE-001)',
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;

            // Check if importing from backend modules
            if (importPath.includes('backend/modules/')) {
              const currentFile = context.getFilename();

              // Extract current module
              const currentModuleMatch = currentFile.match(/modules\/([^\/]+)\//);
              if (!currentModuleMatch) return;
              const currentModule = currentModuleMatch[1];

              // Check if importing from another module's internal
              const importMatch = importPath.match(/modules\/([^\/]+)\/internal/);
              if (importMatch && importMatch[1] !== currentModule) {
                context.report({
                  node,
                  messageId: 'noInternalImports',
                });
              }
            }
          },
        };
      },
    },

    'no-generic-names': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Prevent generic variable and function names',
          category: 'Best Practices',
          recommended: true,
        },
        messages: {
          genericName:
            'Avoid generic names like "{{name}}". Use descriptive names that explain purpose. (GP-002)',
        },
        schema: [],
      },
      create(context) {
        const GENERIC_NAMES = [
          'data',
          'temp',
          'tmp',
          'val',
          'result',
          'stuff',
          'thing',
          'handler',
          'process',
          'handle',
        ];

        return {
          VariableDeclarator(node) {
            if (node.id.type === 'Identifier') {
              const name = node.id.name;
              if (GENERIC_NAMES.includes(name)) {
                context.report({
                  node: node.id,
                  messageId: 'genericName',
                  data: { name },
                });
              }
            }
          },
          FunctionDeclaration(node) {
            if (node.id && node.id.type === 'Identifier') {
              const name = node.id.name;
              if (GENERIC_NAMES.includes(name)) {
                context.report({
                  node: node.id,
                  messageId: 'genericName',
                  data: { name },
                });
              }
            }
          },
        };
      },
    },

    'no-repository-in-controller': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Controllers should not access Repository directly',
          category: 'Architecture',
          recommended: true,
        },
        messages: {
          noRepositoryInController:
            'Controllers should not access Repository directly. Use Service layer instead. (BE-005)',
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const currentFile = context.getFilename();

            if (currentFile.includes('-controller.ts')) {
              const importPath = node.source.value;

              if (importPath.includes('repository') || importPath.includes('Repository')) {
                context.report({
                  node,
                  messageId: 'noRepositoryInController',
                });
              }
            }
          },
        };
      },
    },

    'require-error-classes': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Use typed error classes instead of generic Error',
          category: 'Best Practices',
          recommended: true,
        },
        messages: {
          useErrorClass:
            'Use typed error classes extending ApplicationError instead of generic Error. (BE-009)',
        },
        schema: [],
      },
      create(context) {
        return {
          ThrowStatement(node) {
            const currentFile = context.getFilename();

            // Skip test files
            if (currentFile.includes('.spec.ts') || currentFile.includes('.test.ts')) {
              return;
            }

            if (
              node.argument &&
              node.argument.type === 'NewExpression' &&
              node.argument.callee.name === 'Error'
            ) {
              context.report({
                node,
                messageId: 'useErrorClass',
              });
            }
          },
        };
      },
    },

    'no-any-type': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Avoid using any type',
          category: 'TypeScript',
          recommended: true,
        },
        messages: {
          noAnyType: 'Avoid using "any" type. Use proper types, unknown, or generics. (TS-001)',
        },
        schema: [],
      },
      create(context) {
        return {
          TSAnyKeyword(node) {
            context.report({
              node,
              messageId: 'noAnyType',
            });
          },
        };
      },
    },

    'no-inline-styles-react': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Prevent inline styles in React components',
          category: 'React',
          recommended: true,
        },
        messages: {
          noInlineStyles: 'Avoid inline styles. Use Tailwind classes instead. (FE-001)',
        },
        schema: [],
      },
      create(context) {
        return {
          JSXAttribute(node) {
            if (node.name.name === 'style' && node.value && node.value.type === 'JSXExpressionContainer') {
              const currentFile = context.getFilename();
              if (currentFile.endsWith('.tsx')) {
                context.report({
                  node,
                  messageId: 'noInlineStyles',
                });
              }
            }
          },
        };
      },
    },

    'no-direct-axios-in-components': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Components should not use axios directly',
          category: 'React',
          recommended: true,
        },
        messages: {
          noDirectAxios: 'Use service layer for API calls instead of direct axios. (FE-004)',
        },
        schema: [],
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const currentFile = context.getFilename();

            if (
              currentFile.includes('frontend/') &&
              (currentFile.endsWith('.tsx') || currentFile.endsWith('.ts')) &&
              !currentFile.includes('service')
            ) {
              const importPath = node.source.value;

              if (importPath === 'axios') {
                context.report({
                  node,
                  messageId: 'noDirectAxios',
                });
              }
            }
          },
        };
      },
    },

    'max-function-lines': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce maximum function length',
          category: 'Best Practices',
          recommended: true,
        },
        messages: {
          tooManyLines:
            'Function has {{lines}} lines (max {{max}}). Break it into smaller functions. (GP-003)',
        },
        schema: [
          {
            type: 'object',
            properties: {
              max: {
                type: 'integer',
                minimum: 1,
              },
            },
            additionalProperties: false,
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};
        const maxLines = options.max || 50;

        function checkFunction(node) {
          if (!node.body || node.body.type !== 'BlockStatement') {
            return;
          }

          const startLine = node.loc.start.line;
          const endLine = node.loc.end.line;
          const lines = endLine - startLine + 1;

          if (lines > maxLines) {
            context.report({
              node,
              messageId: 'tooManyLines',
              data: {
                lines,
                max: maxLines,
              },
            });
          }
        }

        return {
          FunctionDeclaration: checkFunction,
          FunctionExpression: checkFunction,
          ArrowFunctionExpression: checkFunction,
        };
      },
    },
  },
};
