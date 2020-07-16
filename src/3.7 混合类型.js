"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCounter() {
    let counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
c(10);
c.reset();
// 注意此处的额外属性 无论有没有初始化 都已经判断为number了
// c.interval.toFixed() // 不报错
// 所以由编写者 自己保证先初始化
c.interval = 5.0;
//# sourceMappingURL=3.7 混合类型.js.map