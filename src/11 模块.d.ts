/**
 * 导出声明
 * 任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出。
 * */
export interface StringValidator {
  isAcceptable(s: string): boolean;
}
export declare const numberRegexp: RegExp;
export declare class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string): boolean;
}
/** 导出语句 */
declare class ZipCodeValidator1 implements StringValidator {
  isAcceptable(s: string): boolean;
}
export { ZipCodeValidator1 };
export { ZipCodeValidator as mainValidator };
/**
 * 重新导出
 * 从其他文件导出
 * */
