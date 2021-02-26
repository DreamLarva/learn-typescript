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
export {};
//# sourceMappingURL=3.7%20%E6%B7%B7%E5%90%88%E7%B1%BB%E5%9E%8B.js.map