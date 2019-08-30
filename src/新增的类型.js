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
    a = b;
    // b = a // Error
}
//# sourceMappingURL=新增的类型.js.map