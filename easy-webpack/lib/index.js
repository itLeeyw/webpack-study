// easy-webpack 的入口文件

const Compiler = require('./compiler');
const options = require('../easyWebpack.config');


new Compiler(options).run();