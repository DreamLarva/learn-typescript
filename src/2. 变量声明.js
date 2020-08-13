{
    /**
     * 参数 ?: 可选参数
     * */
    function keepWholeObject(wholeObject) {
        let { a, b = 1001 } = wholeObject;
    }
    keepWholeObject({ a: "2" });
    function keepWholeObject1(wholeObject = {}) {
        let { a, b = 1001 } = wholeObject;
    }
    keepWholeObject1();
}
{
    function f1({ a, b }) {
        // ...
    }
}
{
    class C {
        constructor() {
            this.p = 12;
        }
        m() {
        }
    }
    let c = new C();
    let clone = Object.assign({}, c);
    console.log(clone.p); // ok 能正确判断为 数字类型
    // 方法都在prototype 上
    // clone.m(); // error!
    const a = {
        a: 1
    };
    const b = {
        a: "string",
        b: 2
    };
    const combination = Object.assign(Object.assign({}, a), b);
    // combination.a. // 正确判断为 string 类型
    // <string>combination.a // 需要断言为需要的
}
{
    let combine = function (a, b, c) {
        const combination = Object.assign(Object.assign({}, a), b);
        // combination.a // 类型为 string |
        // <string>combination.a.charCodeAt(1) // error 不能直接使用
        if (typeof combination.a === "string") {
        }
        const value_a = combination.a;
        value_a.charCodeAt(1); // 赋值断言也可以正常使用
    };
    /**
     * 只要使用 对象拓展 运算符
     * 1. 相同属性名 都没有 ?(可选) 标志 就能直接判断为 最后一个覆盖的属性类型
     * 2. 相同属性名 中出现 ?(可选) 标志 该属性的类型就判断为 所以可能的属性(就算拓展运算符 靠后的对象的属性没有? 也是如此) 如果需要使用就要 ,类型断言后才能使用
     * */
}
//# sourceMappingURL=2. 变量声明.js.map