/**
 * 如果已经在tsconfig 中定义了 就可以不用 /// 注释
 * */
/**
 * 现在已经没有 这个限制的的样子 只要你 .d.ts 文件声明了
 * 引入只能使用
 * import url = require("url");
 * import * as URL from "url"
 * */
/// <reference path="node.d.ts" />
export {};
