"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mySearch;
mySearch = function (source, subString) {
    let result = source.search(subString);
    return result > -1;
};
let mySearch2 = function (source, subString) {
    let result = source.search(subString);
    return result > -1;
};
/**
 * 函数参数 接口里定义的名字相不需要匹配 只要次序对就行
 * */
let mySearch1;
mySearch1 = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
};
let mySearch3;
mySearch = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
};
//# sourceMappingURL=3.1 函数类型.js.map