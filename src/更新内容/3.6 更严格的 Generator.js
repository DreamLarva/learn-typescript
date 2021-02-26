/**
 * TypeScript  3.6引入了对迭代器和生成器功能的更严格检查。
 * 在早期版本中，生成器的用户无法区分是从生成yield的值还return 的值。
 * */
{
    function* foo() {
        if (Math.random() < 0.5)
            yield 100;
        return "Finished!";
    }
    let iter = foo();
    let curr = iter.next();
    if (curr.done) {
        // TypeScript 3.5 and prior thought this was a 'string | number'.
        // It should know it's 'string' since 'done' was 'true'!
        curr.value; // 3.6 确定类型为 string
    }
}
{
    function* bar() {
        let x = yield;
        x.hello();
    }
    let iter = bar();
    iter.next();
    // iter.next(123); // 3.6 类型错误
}
/**
 * 在TypeScript 3.6中，检查器现在知道在第一个示例中curr.value应为正确的类型string，
 * 并且在上一个示例中对的调用将正确地出错next()。
 * 这要归功于对Iterator和IteratorResult类型声明的一些更改，以此包括一些新的类型参数，
 * 并感谢TypeScript用于表示生成器的新类型，称为Generator类型。
 * */
/**
 * Iterator 类型,现在允许用户 指明 yield 的类型 和 return 的类型,以及 next 可以接受的类型.
 * */
{
}
/**
 * 在此基础上 新的Generator 类型就是 Iterator 类型额外拥有 return 和 throw 方法,
 * 并且可迭代
 * */
{
}
/**
 * 为了区分返回值和产生值，TypeScript 3.6将IteratorResult类型转换为已区分联合类型
 * 所以 返回类型在 done 为true 的情况下 是能绝对确定 的
 * */
{
}
/**
 * 为了正确表示可以从调用传递给生成器的类型next()，TypeScript 3.6还可以推断yield生成器函数体内的某些用法。
 * */
{
    function* foo() {
        let x = yield; // 希望传入的值是 string
        console.log(x.toUpperCase());
    }
    let x = foo();
    x.next(); // first call to 'next' is always ignored
    // x.next(42); // error! 'number' is not assignable to 'string'
}
/**
 * 如果 yield 可接受的方法 可接受的值能 有多种,却不显示 声明 就是认定是 never
 * */
{
    function* foo() {
        let x = yield; // 希望传入的值是 string
        let y = yield; // 希望传入的值是 number
        console.log(x.toUpperCase().repeat(y));
    }
    let x = foo();
    x.next(); // first call to 'next' is always ignored
    // x.next("123"); // error
    // x.next(456); // error
}
{
    function* foo() {
        let x = yield; // 希望传入的值是 string
        let y = yield; // 希望传入的值是 number
        if (typeof x === "string" && typeof y === "number") {
            const txt = x.toUpperCase().repeat(y);
            console.log(txt);
            return txt;
        }
        // 确保 else 分支的返回值
        throw new Error("error");
    }
    let x = foo();
    x.next(); // first call to 'next' is always ignored
    // x.next("123"); // error
    // x.next(456); // error
}
/**
 * 如果您希望是显式的，则还可以强制声明return值的类型,yield类型 和 从 用显式yield 表达式返回的值的类型
 * */
{
    /**
     * - yields numbers
     * - returns strings
     * - can be passed in booleans
     */
    function* counter() {
        let i = 0;
        while (true) {
            if (yield i++) {
                break;
            }
        }
        return "done!";
    }
    var iter = counter();
    var curr = iter.next();
    while (!curr.done) {
        console.log(curr.value);
        curr = iter.next(curr.value === 5);
    }
    console.log(curr.value.toUpperCase());
    // prints:
    //
    // 0
    // 1
    // 2
    // 3
    // 4
    // 5
    // DONE!
}
export {};
//# sourceMappingURL=3.6%20%E6%9B%B4%E4%B8%A5%E6%A0%BC%E7%9A%84%20Generator.js.map