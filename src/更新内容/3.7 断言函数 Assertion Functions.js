import assert, { AssertionError } from "assert";
/**
 * There’s a specific set of functions that throw an error if something unexpected happened.
 * They’re called “assertion” functions. As an example, Node.js has a dedicated function for this called assert.
 *
 * 断言函数 如果与预期不符,就抛出错误的 函数
 * */
{
    let someValue;
    assert(someValue === 42);
}
/**
 * 使用node 中的断言函数
 * 可以参看 node 中 assert 的 声明文件 还没用用上 assert condition
 * */
{
    function multiply(x, y) {
        assert(typeof x === "number");
        assert(typeof y === "number");
        return x * y; // x,y 这里推断依然 是 any 类型
    }
}
/**
 * The first type of assertion signature models the way that Node’s assert function works.
 * It ensures that whatever condition is being checked must be true for the remainder of the containing scope.
 *
 * 第一种断言签名的模型,同Node中的断言函数 ,它确保在包含范围的其余部分中，无论检查什么条件都必须为真。
 * */
{
    /**
     * 这种 asserts condition , 传入的 condition 参数 必须是 true,
     * 然后 condition 断言的内容 就会确保在包含范围的其余部分中类型
     * */
    function assert(condition, message) {
        if (!condition) {
            throw new AssertionError({ message });
        }
    }
    function yell1(str) {
        assert(typeof str === "string");
        return str.toUpperCase(); // str 推断为 string
    }
    function yell2(str) {
        assert(typeof str === "number");
        return str.toFixed(); // str 推断为 number
    }
}
/**
 * 另一种 断言的签名 不检查 condition ,而是 直接告诉 ts 一个 准确的类型或另一种类型
 * */
{
    // 调用这个方法就断言函数,就将之后的作用域中,把传入的参数断言成  string 类型
    function assertIsString(val) {
        if (typeof val !== "string") {
            throw new AssertionError({ message: "Not a string!" });
        }
    }
    function yell1(str) {
        assertIsString(str);
        return str.toUpperCase(); // str 推断为 string
    }
}
/**
 * And just like type predicate signatures, these assertion signatures are incredibly expressive. We can express some fairly sophisticated ideas with these.
 * 也可以使用 泛型 搞点复杂的情况
 * */
{
    function assertIsDefined(val) {
        if (val === undefined || val === null) {
            throw new AssertionError({
                message: `Expected 'val' to be defined, but received ${val}`,
            });
        }
    }
    let someValue;
    assertIsDefined(someValue);
    someValue.toFixed(1); // 推断为 number
}
//# sourceMappingURL=3.7%20%E6%96%AD%E8%A8%80%E5%87%BD%E6%95%B0%20Assertion%20Functions.js.map