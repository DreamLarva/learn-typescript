"use strict";
/**
 * 导出声明
 * 任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出。
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
    isAcceptable(s) {
        return s.length === 5 && exports.numberRegexp.test(s);
    }
}
exports.ZipCodeValidator = ZipCodeValidator;
exports.mainValidator = ZipCodeValidator;
/** 导出语句 */
class ZipCodeValidator1 {
    isAcceptable(s) {
        return s.length === 5 && exports.numberRegexp.test(s);
    }
}
exports.ZipCodeValidator1 = ZipCodeValidator1;
// 将多个文件整合 导出 多用于index文件
// export * from "./1. 基础类型"
/**
 * 重新导出
 * 从其他文件导出
 * */
// export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator"
//# sourceMappingURL=11 模块.js.map