"use strict";
/**
 * Improving the experience around tuple types and parameter lists is important because it allows us to get strongly
 * typed validation around common JavaScript idioms - really just slicing and dicing argument lists and passing them to
 * other functions. The idea that we can use tuple types for rest parameters is one place where this is crucial.
 * */
{
    // 西面两个 函数想在相同
    function foo(...args) {
        // ...
    }
    function foo2(arg0, arg1) {
        // ...
    }
    foo("hello", 42);
    // foo("hello", 42, true); // Error
    // foo("hello"); // Error
}
/**
 * There is one place where the differences begin to become observable though: readability.
 * In the first example, we have no parameter names for the first and second elements.
 * While these have no impact on type-checking,
 * the lack of labels on tuple positions can make them harder to use - harder to communicate our intent.
 * */
{
    /**
     * There are a few rules when using labeled tuples. For one, when labeling a tuple element, all other elements in the tuple must also be labeled.
     * */
    // type Bar = [first: string, number]; // Tuple members must all have names or all not have names.
    /**
     * 元组上的标签 不会影响解构
     * */
    function foo(x) {
        // ...
        // note: we didn't need to name these 'first' and 'second'
        const [a, b] = x;
        a;
        //  ^ = const a: string
        b;
        //  ^ = const b: number
    }
}
{
    function createPerson(...Name) { }
    // 2020.2 webstorm 提示参数还是只能显示 ...Name:name
    // createPerson()
}
//# sourceMappingURL=4.0%E6%9C%89%E6%A0%87%E7%AD%BE%E7%9A%84%E5%85%83%E7%BB%84%E5%85%83%E7%B4%A0.js.map