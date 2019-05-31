"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let isDone = false;
let decLiteral = 6;
let hexLiteral = 0xf00d;
let binaryLiteral = 0b1010;
let octalLiteral = 0o744;
/**
 * 注意ts 中不能直接在最外层的作用域 定义 name 的变量 或者是 常量
 * */
let _name = "bob";
_name = "smith";
{
    let _name = "bob";
}
{
    let name = `Gene`;
    let age = 37;
    let sentence1 = `Hello, my name is ${name}.
    I'll be ${age + 1} years old next month.`;
    let sentence2 = "Hello, my name is " + name + ".\n\n" +
        "I'll be " + (age + 1) + " years old next month.";
}
{
    let list1 = [1, 2, 3];
    list1.push(2);
    let list2 = [1, 2, 3];
}
{
    /** 元祖 */
    // Declare a tuple type
    let x;
    // Initialize it
    x = ['hello', 10]; // OK
    console.log(x[0].substr(1)); // OK
    // console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
    /**
     * 官网不报错 但是实际报错
     * */
    // x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
    // console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
    // x[6] = true; // Error, 布尔不是(string | number)类型
    {
        let x;
        // Initialize it
        x = ['hello']; // OK
        // 类型断言 x[0]是一个string
        console.log(x[0].substr(1)); // OK
        // console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
    }
}
{
    /** 枚举 */
    let Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    let c = Color.Green;
    {
        /** 手动赋值 */
        let Color;
        (function (Color) {
            Color[Color["Red"] = 1] = "Red";
            Color[Color["Green"] = 2] = "Green";
            Color[Color["Blue"] = 4] = "Blue";
        })(Color || (Color = {}));
        let c = Color.Green;
    }
    {
        let Color;
        (function (Color) {
            Color[Color["Red"] = 1] = "Red";
            Color[Color["Green"] = 2] = "Green";
            Color[Color["Blue"] = 3] = "Blue";
        })(Color || (Color = {}));
        let colorName = Color[2]; // warn 可能index 越界
        console.log(colorName); // 显示'Green'因为上面代码里它的值是2
    }
}
{
    /** Any */
    {
        let notSure = 4;
        notSure = "maybe a string instead";
        notSure = false; // okay, definitely a boolean
    }
    {
        let notSure = 4;
        // notSure.ifItExists(); // okay, ifItExists might exist at runtime
        notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
        let prettySure = 4;
        // prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
    }
    {
        let list = [1, true, "free"];
        list[1] = 100;
    }
}
{
    /** Void */
    function warnUser() {
        console.log("This is my warning message");
    }
    let unusable = undefined;
    // Not much else we can assign to these variables!
    let u = undefined;
    let n = null;
}
{
    /** Object*/
    // object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
    // ** 注意 ** 这里是不包含null的
    // 使用object类型，就可以更好的表示像Object.create这样的API
    create({ prop: 0 }); // OK
    create(null); // OK
    // create(42); // Error
    // create("string"); // Error
    // create(false); // Error
    // create(undefined); // Error
}
{
    /** Never */
    // 返回never的函数必须存在无法达到的终点(执行到底)
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
}
{
    /** 类型断言 */
    let someValue = "this is a string";
    let strLength = someValue.length;
    let someValue1 = "this is a string";
    let strLength1 = someValue.length;
}
//# sourceMappingURL=1. 基础类型.js.map