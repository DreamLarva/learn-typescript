let a;
let b;
// 加
// a = a + b
a += b;
// 减
// a = a - b
a -= b;
// 乘
// a = a * b
a *= b;
// 除
// a = a / b
a /= b;
// 求幂
// a = a ** b
a **= b;
// 向左位移
// a = a << b
a <<= b;
/**
 * 新增的
 * */
// a = a && b;
a && (a = b);
// a = a || b;
a || (a = b);
// a = a ?? b;
a !== null && a !== void 0 ? a : (a = b);
/**
 * 用法
 * */
{
    let values;
    // Before
    (values !== null && values !== void 0 ? values : (values = [])).push("hello");
}
{
    let values;
    // After
    (values !== null && values !== void 0 ? values : (values = [])).push("hello");
}
{
    let obj;
    let foo;
    obj.prop || (obj.prop = foo());
    // roughly equivalent to either of the following
    obj.prop || (obj.prop = foo());
    if (!obj.prop) {
        obj.prop = foo();
    }
}
{
    const obj = {
        get prop() {
            console.log("getter has run");
            // Replace me!
            return false;
        },
        set prop(_val) {
            console.log("setter has run");
        },
    };
    function foo() {
        console.log("right side evaluated");
        return true;
    }
    console.log("This one always runs the setter");
    obj.prop = obj.prop || foo();
    // 编译为 obj.prop = obj.prop || foo();
    console.log("This one *sometimes* runs the setter");
    obj.prop || (obj.prop = foo());
    // 编译为 obj.prop || (obj.prop = foo());
    // 所以 当 obj.prop falsy 时 只会调用 getter 而不会调用 setter
}
export {};
//# sourceMappingURL=4.0%E7%9F%AD%E8%B7%AF%E5%88%86%E9%85%8D%E8%BF%90%E7%AE%97%E7%AC%A6.js.map