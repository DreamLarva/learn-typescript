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
export {};
