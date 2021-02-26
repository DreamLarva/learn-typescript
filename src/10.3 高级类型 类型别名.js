/**
 * 类型别名
 * 类型别名会给一个类型起个新名字。
 *
 * *** 可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型 ***
 * 不能当接口 或者 class 使用 不能使用在 泛型<>中
 * */
{
    class A {
    }
    function getName(n) {
        if (typeof n === "string") {
            return n;
        }
        else {
            return n();
        }
    }
}
/** 泛型 */
{
    let temp;
    temp = {
        value: "text",
        left: { value: "text" },
    };
}
/** 交叉类型  */
{
    let people;
    people = {
        name: "1",
    };
    let s = people.name;
    s = people.next.name;
    s = people.next.next.name;
    s = people.next.next.next.name;
    // let u2_1: u2 = { a: 1 }; // error
    let u2_2 = { a: 2 };
    let u4_1 = { a: 1 };
    let u5_1 = { a: 1 };
    let u6_1 = { a: 1 };
    // let u6_2:u6 = {a:3}
}
let Alias = 123;
export {};
//# sourceMappingURL=10.3%20%E9%AB%98%E7%BA%A7%E7%B1%BB%E5%9E%8B%20%E7%B1%BB%E5%9E%8B%E5%88%AB%E5%90%8D.js.map