"use strict";
/**
 * 类型变量T
 * T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。
 * */
Object.defineProperty(exports, "__esModule", { value: true });
{
    function identity0(arg) {
        return arg;
    }
    /** 我们定义了泛型函数后，可以用两种方法使用。 第一种是，传入所有的参数，包含类型参数：*/
    let output1 = identity0("myString"); // output提示的字符串的方法
    /** 利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型 */
    let output2 = identity0("myString"); //  类型推断 output依然提示的字符串的方法
}
/**
 * from 2.4 更严格的泛型检查
 * TypeScript在比较两个单一签名的类型时会尝试统一类型参数。
 * 因此，在涉及到两个泛型签名的时候会进行更严格的检查
 *
 * 注意推断的泛型 如果没有泛型约束 则默认是 {} 类型
 * 且每个 不同名的泛型 是不能兼容的
 * */
{
    function f(a, b) {
        // a = b;  // Error  b 不兼容 a
        b = a; // Ok a 兼容 b
    }
}
//# sourceMappingURL=6.0 泛型.js.map