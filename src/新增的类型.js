"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * any 类型指代所有类型
 * 且 使用.操作符 获得的类型 依然是 any
 * */
{
    let notSure = 4;
    notSure = "maybe a string instead";
    notSure = false; // okay, definitely a boolean
}
/**
 * void 类型
 * 可以 赋值undefined
 * */
{
    let unusable = undefined;
    // unusable = null; // 现在不允许 给 void 赋值null
}
/**
 * Null 和 Undefined
 * */
{
    let u = undefined;
    let n = null;
}
/**
 * Never
 * never类型表示的是那些永不存在的值的类型
 * 如报错 或者 无限循环
 * */
{
    // 返回never的函数必须存在无法达到的终点
    function error(message) {
        throw new Error(message);
    }
    // 推断的返回值类型为never
    function fail() {
        return error("Something failed");
    }
    // 返回never的函数必须存在无法达到的终点
    function infiniteLoop() {
        while (true) {
        }
    }
    // 当推断时 只要有 非never 类型的 就是推断为非 never 类型
    // 当仅有 never 类型 才推断为 never 类型
    let a = 1 || new Error();
}
/**
 * object类型
 * TypeScript没有表示非基本类型的类型，即不是number | string | boolean | symbol | null | undefined的类型。
 * */
{
    function create(param) {
    }
    create({ prop: 0 }); // OK
    create({}); // OK
    // create(null); // error
    // create(42); // Error
    // create("string"); // Error
    // create(false); // Error
    // create(undefined); // Error
    create(() => {
    });
    /**
     * {} 指代 null 和 undefined 外的所有类型
     * */
    function create_1(param) {
    }
    create_1({ prop: 0 }); // OK
    create_1({}); // OK
    // create_1(null); // error
    create_1(42); // ok
    create_1("string"); // ok
    create_1(false); // ok
    // create_1(undefined); // error
    create_1(() => {
    }); // ok
}
/**
 * Function类型
 * 代表最广泛的任意的函数
 * */
{
    let a;
    let b;
    let c;
    a = b;
    // b = a // Error
    a = c;
    b = c;
    c = b; // ok 注意 any 类型即可匹配任何 协变 也可匹配 任何抗变
    // c = a // error
}
/**
 * unknown 类型
 * 任何值都可以赋给unknown，
 * 但是当没有类型断言或基于控制流的类型细化时unknown不可以赋值给其它类型，除了它自己和any外。
 * 同样地，在unknown没有被断言或细化到一个确切类型之前，是不允许在其上进行任何操作的。
 * */
{
    // unknown 类型不能参与 非 == === != !== 运算
    function f10(x) {
        x == 5;
        x !== 10;
        // x >= 0; // Error
        // x + 1; // Error
        // x * 2; // Error
        // -x; // Error
        // +x; // Error
    }
    // unknown 无任何属性 和方法 也不能作为 函数调用
    function f11(x) {
        // x.foo; // Error
        // x[5]; // Error
        // x(); // Error
        // new x(); // Error
    }
    // Anything is assignable to unknown
    function f21(pAny, pNever, pT) {
        let x;
        x = 123;
        x = "hello";
        x = [1, 2, 3];
        x = new Error();
        x = x;
        x = pAny;
        x = pNever;
        x = pT;
    }
    // unknown assignable only to itself and any
    function f22(x) {
        let v1 = x;
        let v2 = x;
        // let v3: object = x; // Error
        // let v4: string = x; // Error
        // let v5: string[] = x; // Error
        // let v6: {} = x; // Error
        // let v7: {} | null | undefined = x; // Error
    }
    // Type parameter 'T extends unknown' not related to object
    function f23(x) {
        // let y: object = x; // Error
    }
    // Anything but primitive assignable to { [x: string]: unknown }
    function f24(x) {
        x = {};
        x = { a: 5 };
        // x = [1, 2, 3]; // error
        // x = 123; // Error
    }
    // Locals of type unknown always considered initialized
    function f25() {
        let x;
        let y = x;
    }
    // Spread of unknown causes result to be unknown
    function f26(x, y, z) {
        let o1 = { a: 42, ...x }; // { a: number }
        // let o2 = {a: 42, ...x, ...y}; // error 版本3.7.2 只要对象类型才能展开 unknown 类型不再可以使用 spread 运算符
        // let o3 = {a: 42, ...x, ...y, ...z}; // error 版本3.7.2 只要对象类型才能展开 unknown 类型不再可以使用 spread 运算符
    }
    // Functions with unknown return type don't need return expressions
    // function f27(): unknown {} // error
    function f27() { return; }
    // Rest type cannot be created from unknown
    function f28(x) {
        // let {...a} = x; // Error
    }
    // Class properties of type unknown don't need definite assignment
    class C1 {
    }
}
function f20(x) {
    if (typeof x === "string" || typeof x === "number") {
        x; // string | number
    }
    if (x instanceof Error) {
        x; // Error
    }
    if (isFunction(x)) {
        x; // Function
    }
}
/**
 * 特别的提示
 * {} 类型 就是 任意 可以 用 .xxx 的类型 也就是 除 null 和 undefined 的类型
 * */
{
    const a = { a: { b: {} } };
    const b = 1;
    const c = true;
    const d = [];
    // const e: {} = null // error
    // const f: {} = undefined // error
    const g = NaN;
    const h = () => null;
}
//# sourceMappingURL=新增的类型.js.map