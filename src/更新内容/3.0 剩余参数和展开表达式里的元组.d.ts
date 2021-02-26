/**
 * 泛型剩余参数
 * 剩余参数允许带有泛型类型，这个泛型类型被限制为是一个数组类型，
 * 类型推断系统能够推断这类泛型剩余参数里的元组类型。
 * 这样就可以进行高阶捕获和展开部分参数列表:
 * */
declare function bind<T, U extends any[], V>(f: (x: T, ...args: U) => V, x: T): (...args: U) => V;
declare function f3(x: number, y: string, z: boolean): void;
declare const f2: (y: string, z: boolean) => void;
declare const f1: (z: boolean) => void;
declare const f0: () => void;
