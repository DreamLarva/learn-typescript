/**
 * TypeScript 3.4 introduces a new construct for literal values called const assertions. Its syntax is a type assertion with const in place of the type name (e.g. 123 as const). When we construct new literal expressions with const assertions, we can signal to the language that
 * ts3.4 现在就可以 使用 as const 作为字面量断言
 * 1. no literal types in that expression should be widened (e.g. no going from "hello" to string)
 * 1. 非字面量的类型 会被放宽()
 *
 * 2. object literals get readonly properties
 * 2. 对象字面量添加 所有属性添加 readonly
 *
 * 3. array literals become readonly tuples
 * 3. 数组字面量 变为readonly的元组
 * */

{
    // Type '"hello"'
    let x = "hello" as const;

    // Type 'readonly [10, 20]'
    let y = [10, 20] as const;

    // Type '{ readonly text: "hello" }'
    let z = {text: "hello"} as const;
}
// 前置断言
{
    // Type '"hello"'
    let x = "hello" as const;

    // Type 'readonly [10, 20]'
    let y = [10, 20] as const;

    // Type '{ readonly text: "hello" }'
    let z = {text: "hello"} as const;
}
/**
 * 可以省略原本的 完整的字面量类型声明 ,断言成const 后会自动推断
 * */
{
    // Works with no types referenced or declared.
    // We only needed a single const assertion.
    function getShapes() {
        const result = [
            {kind: "circle", radius: 100},
            {kind: "square", sideLength: 50},
        ] as const;

        return result;
    }

    for (const shape of getShapes()) {
        // Narrows perfectly!
        if (shape.kind === "circle") {
            console.log("Circle radius", shape.radius);
        } else {
            console.log("Square side length", shape.sideLength);
        }
    }
}
/**
 * 模仿 ts enum 的行为
 * */
{
    const Colors = {
        red: "RED",
        blue: "BLUE",
        green: "GREEN",
    } as const;
}

/**
 * 注意是雌昂
 * */
/**
 * const 断言只会作用于 单独的字面量上
 * */
{
    // Error! A 'const' assertion can only be applied to a
    // to a string, number, boolean, array, or object literal.
    // let a = (Math.random() < 0.5 ? 0 : 1) as const;

    // Works!
    let b = Math.random() < 0.5 ? (0 as const) : (1 as const);
}
/**
 * const断言并不会把 深层的类型 也添加上 readonly
 * */
{
    let arr = [1, 2, 3, 4];

    let foo = {
        name: "foo",
        contents: arr, // contents 此处arr 的类型 并不会被 断言成 const
    } as const;

    // foo.name = "bar"; // error!
    // foo.contents = []; // error!

    foo.contents.push(5); // ...works!
}

{
    // 推断正确 返回值中的 非字面量依然保持自己的类型不变
    function foo(a: number) {
        return {
            a,
            b: 1,
        } as const;
    }
}

export {};
