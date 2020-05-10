/**
 * 递归的类型别名
 * */
/** 3.6 以下版本报错*/
declare type ValueOrArray<T> = T | Array<ValueOrArray<T>>;
