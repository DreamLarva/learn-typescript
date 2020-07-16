"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        left: { value: "text" }
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
}
let Alias = 123;
//# sourceMappingURL=10.3 高级类型 类型别名.js.map