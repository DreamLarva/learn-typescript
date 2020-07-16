"use strict";
/// <reference path="node.d.ts"/>
// 现在已经可以不需要的样子
/**
 * 如果已经在tsconfig 中定义了 就可以不用 /// 注释
 * */
/**
 * 现在已经没有 这个限制的的样子 只要你 .d.ts 文件声明了
 * 引入只能使用
 * import url = require("url");
 * import * as URL from "url"
 * */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url")); // ok
// import * as URL from "url"; // ok
let myUrl = url_1.default.parse("http://www.typescriptlang.org");
console.log(myUrl);
//# sourceMappingURL=use.js.map