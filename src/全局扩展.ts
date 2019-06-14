/**
 * 将模块内部声明添加到全局中
 * 在项目的任何一个地方 都有效果
 * */

// observable.ts
export class Observable<T> {
    // ... still no implementation ...
    constructor(public val: number) {
        this.val = val;
    }

}

declare global {
    interface Array<T> {
        toObservable(): Observable<T>;
    }
}

Array.prototype.toObservable = function () {
    return new Observable(1)
};


[].toObservable();
