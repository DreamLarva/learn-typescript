{
    const T1 = "abc"; // "abc"
    const T2 = "abc"; // string
    let l1 = "abc"; // string 可变所以没问题
    function fun1(a) {
        return a;
    }
    fun1("abc"); // 返回类型 "abc
    function fun2(a) {
        return a;
    }
    fun2("abc"); // 返回类型 string
    const c1 = { a: "abc" }; // {a:string} a 的值可以改这也很合理
}
{
}
/**
 * 兼容关系
 * */
{
}
{
    // same as
    //   type Greeting = "hello world";
}
{
    // same as
    //   type SeussFish = "one fish" | "two fish"
    //                  | "red fish" | "blue fish";
}
{
    // Takes
    //   | "top-left"    | "top-center"    | "top-right"
    //   | "middle-left" | "middle-center" | "middle-right"
    //   | "bottom-left" | "bottom-center" | "bottom-right"
    function setAlignment(value) {
    }
    setAlignment("top-left"); // works!
    // setAlignment("top-middel"); // error!
    // setAlignment("top-pot");    // error! but good doughnuts if you're ever in Seattle
}
/**
 * 如果 placeholder 中传入的是number 类型 ,则匹配的位置 一定是数字类型
 * */
{
}
let person = makeWatchedObject({
    firstName: "Homer",
    age: 42,
    location: "Springfield",
});
// works! 'newName' is typed as 'string'
person.on("firstNameChanged", newName => {
    // 'newName' has the type of 'firstName'
    console.log(`new name is ${newName.toUpperCase()}`);
});
// works! 'newAge' is typed as 'number'
person.on("ageChanged", newAge => {
    if (newAge < 0) {
        console.log("warning! negative age");
    }
});
/**
 * 新增的 加工字符串的类型
 * */
{
    // same as
    //   type HELLO = "HELLO";
}
/**
 * 详细设计
 * */
/**
 * 1联合类型 在template literal 占位符中(${xx}) 也是遵循笛卡尔积
 * 例 :
 * `[${A|B|C}]` 解析为 `[${A}]` | `[${B}]` | `[${C}]`.
 * `[${A|B},${C|D}]` 解析为 `[${A},${C}]` | `[${A},${D}]` | `[${B},${C}]` | `[${B},${D}]`.
 *
 * 字符串,数字,布尔值,bigint的字面量类型 在占位符中,会自动替换为对应的字面量类型
 * 例 :
 * `[${'abc'}]` resolves to `[abc]` and `[${42}]` 解析为 `[42]`.
 *
 * 位符中任何类型的any，string，number，boolean或bigint都会令模板字符串类型 解析为string类型。
 *
 * 在占位符中的 never 会令template literal 解析为 never
 * */
{
}
/**
 * 超过 100,000 笛卡尔积的结果的模板字符串类型会直接报错
 * */
{
    // type Zip = `${Digit}${Digit}${Digit}${Digit}${Digit}`;  // Error
}
/**
 * 大小写转换的 类型为  intrinsic string types (内部类型)
 * */
{
}
/**
 * template literal types 是 string 的子类型 , 且都可以分配给 string 类型
 * 此外 template literal type `${T}` 是 template literal type `${C}` 的子类型,
 * 且可分配给 template literal type `${C}`, C 是 string literal type 由 T 约束
 * */
{
    function test(name) {
        let s1 = name; // template literal type 分配给 string
        let s2 = name; // template literal type 分配给 string 联合类型
    }
}
/**
 * template literal types 同样支持 推理
 * 推理的时候 字面量必须完全符合 源类型
 * Inference proceeds by matching each placeholder to a substring in the source from left to right:
 * A placeholder followed by a literal character span is matched by inferring zero or more characters from the
 * source until the first occurrence of that literal character span in the source.
 * */
{
}
/**
 * Template literal types 可以结合 递归条件类型 来写 类似 Join 和 Split 的类型
 * */
{
}
{
    const obj = { a: { b: { c: 42, d: 'hello' } } };
    const a = getPropValue(obj, 'a'); // { b: {c: number, d: string } }
    const b = getPropValue(obj, 'a.b'); // {c: number, d: string }
    const c = getPropValue(obj, 'a.b.d'); // string
    const d = getPropValue(obj, 'a.b.x'); // unknown
    const e = getPropValue(obj, s); // unknown
}
export {};
//# sourceMappingURL=4.1%20%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%B1%BB%E5%9E%8B.js.map