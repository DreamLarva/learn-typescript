/**
 * TypeScript 3.1，在元组和数组上的映射对象类型现在会生成新的元组/数组，
 * 而非创建一个新的类型并且这个类型上具有如push()，pop()和length这样的成员。
 * */
type MapToPromise<T> = { [K in keyof T]: Promise<T[K]> };

type Coordinate = [number, number];

// 最终索引类型 依然是 个数组 或是 元组
type PromiseCoordinate = MapToPromise<Coordinate>; // [Promise<number>, Promise<number>]

export {};
