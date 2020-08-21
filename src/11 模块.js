export const numberRegexp = /^[0-9]+$/;
export class ZipCodeValidator {
    isAcceptable(s) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
/** 导出语句 */
class ZipCodeValidator1 {
    isAcceptable(s) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export { ZipCodeValidator1 };
// 导出原先的验证器但做了重命名
export { ZipCodeValidator as mainValidator };
// 将多个文件整合 导出 多用于index文件
// export * from "./1. 基础类型"
/**
 * 重新导出
 * 从其他文件导出
 * */
// export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator"
//# sourceMappingURL=11 模块.js.map