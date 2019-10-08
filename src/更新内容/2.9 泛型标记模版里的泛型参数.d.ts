/**
 * TypeScript 2.9允许传入泛型参数到标记模版字符串。
 * */
declare function tag<T>(strs: TemplateStringsArray, ...args: T[]): T;
declare let a: string | number;
