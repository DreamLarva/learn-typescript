/**
 * 对返回 never 类型的方法 更好的支持
 * */
/**
 * 一个函数返回 never 类型那么说明,出现了 抛出错误,或者程序退出
 * 例如 process.exit(...) 方法 返回的就是 never 类型
 * */
/**
 * 为了保证 方法 不可能返回 undefined 或者其他有效的返回内容
 * ts 需要一个 return 或者 throw 在函数的末尾
 * */
declare function doThingWithString(x: string): string;
declare function doThingWithNumber(x: number): number;
