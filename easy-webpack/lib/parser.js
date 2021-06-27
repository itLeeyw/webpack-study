// 解析 AST 语法树
// 将 AST 转换成代码
// ES6 -> ES5

const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');

module.exports = {
    getAST: (path) => {
        const content = fs.readFileSync(path, 'utf-8')

        return babylon.parse(content, {
            sourceType: 'module',
        });
    },
    getDependencis: (ast) => {
        const dependencies = []
        traverse(ast, {
            ImportDeclaration: ({ node }) => {
                dependencies.push(node.source.value);
            }
        });
        return dependencies;
    },
    transform: (ast) => {
        const { code } = transformFromAst(ast, null, {
            presets: ['env']
        });

        return code;
    }
};