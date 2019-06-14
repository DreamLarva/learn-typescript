/**
 * 将模块内部声明添加到全局中
 * 在项目的任何一个地方 都有效果
 * */
export declare class Observable<T> {
    val: number;
    constructor(val: number);
}
declare global {
    interface Array<T> {
        toObservable(): Observable<T>;
    }
}
