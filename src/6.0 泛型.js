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
//# sourceMappingURL=6.0 泛型.js.map