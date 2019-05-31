"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let sym1 = Symbol();
let sym2 = Symbol("key"); // 可选的字符串key
let sym3 = Symbol("key");
// symbols是唯一的
sym2 === sym3; // false,
// 可以互相赋值
sym2 = sym3;
sym2 = sym1;
// 像字符串一样，symbols也可以被用做对象属性的键。
const sym = Symbol(); // 注意必须是用 const 初始化
let obj = {
    a: 1,
    [sym]: "value"
};
console.log(obj[sym]); // "value"
{
    let sym = Symbol(); // 注意必须是用 const 初始化
    let obj = {
        a: 1,
        [sym]: "value",
    };
    // console.log(obj[sym]); // error
}
// Symbols也可以与计算出的属性名声明相结合来声明对象的属性和类成员。
const getClassNameSymbol = Symbol(); // 同样必须const
class C {
    [getClassNameSymbol]() {
        return "C";
    }
}
let c = new C();
let className = c[getClassNameSymbol](); // "C"
//# sourceMappingURL=Symbols.js.map