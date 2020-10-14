"use strict";
/**
 * 递归的类型别名
 * */
// type Foo = Foo;// Error 类型不能递归自己
/**
 * This is strange because there is technically nothing wrong with any use users could always write what was effectively the same code by introducing an interface.
 * ??
 * */
{
}
/**
 * Because interfaces (and other object types) introduce a level of indirection and their full structure doesn’t need
 * to be eagerly built out, TypeScript has no problem working with this structure.
 *
 * ts 的interface 或其他类似 对象的类型 并不会急切的需要引用类型的确切类型
 * 所以ts 可以正常解析 递归的类型
 * ?? 类似于生成图的逻辑 先留引用在填内容 ??
 * */
/**
 * 表示JSON 的类型
 * */
{
}
/**
 * This new relaxation also lets us recursively reference type aliases in tuples as well. The following code which used to error is now valid TypeScript code.
 * 现在下面代码不会报错
 * */
{
  const myNode = [
    "div",
    { id: "parent" },
    ["div", { id: "first-child" }, "I'm the first child"],
    ["div", { id: "second-child" }, "I'm the second child"],
  ];
}
//# sourceMappingURL=3.7 (More) Recursive Type Aliases.js.map
