"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 传递给一个函数的参数个数必须与函数期望的参数个数一致 */
{
    function buildName0(firstName, lastName) {
        return firstName + " " + lastName;
    }
    // let result1 = buildName("Bob");                  // error, too few parameters
    // let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
    let result3 = buildName0("Bob", "Adams"); // ah, just right
}
/**
 * 可选参数
 * 可选参数不可以出现在 任何普通参数的前面
 * */
{
    function buildName3(firstName, lastName) {
        if (lastName)
            return firstName + " " + lastName;
        else
            return firstName;
    }
    let result1 = buildName3("Bob"); // works correctly now
    // let result2 = buildName1("Bob", "Adams", "Sr.");  // error, too many parameters
    let result3 = buildName3("Bob", "Adams"); // ah, just right
}
/**
 * 默认参数
 * 设置了 默认值的参数 默认的类型就是默认值的类型
 * */
{
    function buildName2(firstName, lastName = "Smith") {
        return firstName + " " + lastName;
    }
    let result1 = buildName2("Bob"); // works correctly now, returns "Bob Smith"
    let result2 = buildName2("Bob", undefined); // still works, also returns "Bob Smith"
    // let result3 = buildName2("Bob", "Adams", "Sr.");     // error, too many parameters
    let result4 = buildName2("Bob", "Adams"); // ah, just right
}
//# sourceMappingURL=5.1 可选参数 默认参数.js.map