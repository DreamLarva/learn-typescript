/**
 * 将模块内部声明添加到全局中
 * 在项目的任何一个地方 都有效果
 * */
// observable.ts
export class Observable {
    // ... still no implementation ...
    constructor(val) {
        this.val = val;
        this.val = val;
    }
}
Array.prototype.toObservable = function () {
    return new Observable(1);
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
//# sourceMappingURL=全局扩展.js.map