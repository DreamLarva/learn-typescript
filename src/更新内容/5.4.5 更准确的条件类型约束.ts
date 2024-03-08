/**
 * More Accurate Conditional Type Constraints
 * 更准确的条件类型约束
 *
 * 您可以在此处阅读有关具体更改的信息。
 * https://github.com/microsoft/TypeScript/pull/56004
 * */

type IsArray<T> = T extends any[] ? true : false;

function foo<U extends object>(x: IsArray<U>) {
  // x 类型 为 boolean

  // let first: true = x;    // Error
  // let second: false = x;  // Error, but previously wasn't
}
