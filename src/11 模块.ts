/**
 * 导出声明
 * 任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出。
 * */


export interface StringValidator {
    isAcceptable(s: string): boolean;
}
export const numberRegexp = /^[0-9]+$/;
export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

/** 导出语句 */
class ZipCodeValidator1 implements StringValidator {
    isAcceptable(s: string) {
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
