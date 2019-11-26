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

/**
 * 在 .ts 文件中
 * */
declare global {
    interface Array<T> {
        toObservable(): Observable<T>;
    }
}

Array.prototype.toObservable = function () {
    return new Observable(1)
};


[].toObservable();

/**
 * 在 .d.ts 文件中已经声明该类型
 * */
// Add it at runtime
window.helloWorld = () => console.log('hello world');

// Call it
window.helloWorld();

// 滥用会导致错误
// window.helloWorld('gracius'); // Error: 提供的参数与目标不匹配
