let mySearch;
mySearch = function (source, subString) {
    // subString原来为 any 现在为 string  兼容
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
export {};
//# sourceMappingURL=3.1%20%E5%87%BD%E6%95%B0%E7%B1%BB%E5%9E%8B.js.map