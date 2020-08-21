let sym1 = Symbol();
let sym2 = Symbol("key"); // 可选的字符串key
let sym3 = Symbol("key");
/**
 * 注意 let 初始化的 类型为 symbol
 * 而 const 初始化的 类型为 unique symbol
 *
 * unique symbols是 symbols的子类型
 * */
{
    let a = Symbol();
    const b = a; // b 类型为 symbol
    const c = Symbol();
    let d = c; // d 类型为 symbol
}
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
export {};
//# sourceMappingURL=Symbols.js.map