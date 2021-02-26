"use strict";
/**
 * 带元组类型的剩余参数
 * 当剩余参数里有元组类型时，元组类型被扩展为离散参数序列。 例如，如下两个声明是等价的：
 * */
{
}
/**
 * 带有元组类型的展开表达式
 * 在函数调用中，若最后一个参数是元组类型的展开表达式，那么这个展开表达式相当于元组元素类型的离散参数序列。
 * 因此，下面的调用都是等价的：
 * */
{
    function foo(a, b, c) { }
    const args = [42, "hello", true];
    foo(42, "hello", true);
    foo(args[0], args[1], args[2]);
    foo(...args);
}
const f2 = bind(f3, 42); // (y: string, z: boolean) => void
const f1 = bind(f2, "hello"); // (z: boolean) => void
const f0 = bind(f1, true); // () => void
f3(42, "hello", true);
f2("hello", true);
f1(true);
f0();
//# sourceMappingURL=3.0%20%E5%89%A9%E4%BD%99%E5%8F%82%E6%95%B0%E5%92%8C%E5%B1%95%E5%BC%80%E8%A1%A8%E8%BE%BE%E5%BC%8F%E9%87%8C%E7%9A%84%E5%85%83%E7%BB%84.js.map