/**
 * 一个对象可以同时做为函数和对象使用，并带有额外的属性。
 * 静态属性
 * */
interface Counter {
    interval: number;

    (start: number): string;

    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) {
    };
    counter.interval = 123;
    counter.reset = function () {
    };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
// 注意此处的额外属性 无论有没有初始化 都已经判断为number了
// c.interval.toFixed() // 不报错
// 所以由编写者 自己保证先初始化
c.interval = 5.0;
// c.interval = "string"; // error
export {}


