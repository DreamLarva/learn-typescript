/**
 * 当两个枚举具有相同的声明名称和枚举成员名称时，它们以前总是被认为是兼容的；
 * 但是，当这些值已知时，TypeScript 会默默地允许它们具有不同的值。
 * */

namespace First {
  export enum SomeEnum {
    A = 0,
    B = 1,
  }
}

namespace Second {
  export enum SomeEnum {
    A = 0,
    B = 2,
  }
}

function foo(x: First.SomeEnum, y: Second.SomeEnum) {
  // Both used to be compatible - no longer the case,
  // TypeScript errors with something like:
  //
  //  Each declaration of 'SomeEnum.B' differs in its value, where '1' was expected but '2' was given.
  // x = y; // error
  // y = x; // error
}

/**
 * Additionally, there are new restrictions for when one of the enum members does not have a statically-known value.
 * In these cases, the other enum must at least be implicitly numeric (e.g. it has no statically resolved initializer),
 * or it is explicitly numeric (meaning TypeScript could resolve the value to something numeric). Practically speaking, what this means is that string enum members are only ever compatible with other string enums of the same value.
 * 此外，当其中一个枚举成员不具有静态已知值时，存在新的限制。
 * 在这些情况下，另一个枚举必须至少是隐式数字（例如，它没有静态解析的初始值设定项），或者它是明确的数字（意味着 TypeScript 可以将值解析为数字）。
 * 实际上，这意味着字符串枚举成员仅与相同值的其他字符串枚举兼容。
 * */
namespace First1 {
  export declare enum SomeEnum {
    A,
    B,
  }
}

namespace Second1 {
  export declare enum SomeEnum {
    A,
    B = "some known string",
  }
}

function foo1(x: First.SomeEnum, y: Second.SomeEnum) {
  // Both used to be compatible - no longer the case,
  // TypeScript errors with something like:
  //
  //  One value of 'SomeEnum.B' is the string '"some known string"', and the other is assumed to be an unknown numeric value.
  // x = y; // error
  // y = x; // error
}

export {}
