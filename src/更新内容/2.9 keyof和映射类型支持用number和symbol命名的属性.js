"use strict";
/**
 * TypeScript 2.9增加了在索引类型和映射类型上支持用number和symbol命名属性。
 * 在之前，keyof操作符和映射类型只支持string命名的属性。
 * */
/*
改动包括：
    - 对某些类型T，索引类型keyof T是string | number | symbol的子类型。
    - 映射类型{ [P in K]: XXX }，其中K允许是可以赋值给string | number | symbol的任何值。
    - 针对泛型T的对象的for...in语句，迭代变量推断类型之前为keyof T，现在是Extract<keyof T, string>。（换句话说，是keyof T的子集，它仅包含类字符串的值。）

对于对象类型X，keyof X将按以下方式解析：
    - 如果X带有字符串索引签名，则keyof X为string，number和表示symbol-like属性的字面量类型的联合，否则
    - 如果X带有数字索引签名，则keyof X为number和表示string-like和symbol-like属性的字面量类型的联合，否则
    - keyof X为表示string-like，number-like和symbol-like属性的字面量类型的联合。

在何处：
    - 对象类型的string-like属性，是那些使用标识符，字符串字面量或计算后值为字符串字面量类型的属性名所声明的。
    - 对象类型的number-like属性是那些使用数字字面量或计算后值为数字字面量类型的属性名所声明的。
    - 对象类型的symbol-like属性是那些使用计算后值为symbol字面量类型的属性名所声明的。

对于映射类型{ [P in K]: XXX }，K的每个字符串字面量类型都会引入一个名字为字符串的属性，
K的每个数字字面量类型都会引入一个名字为数字的属性，
K的每个symbol字面量类型都会引入一个名字为symbol的属性。
 并且，如果K包含string类型，那个同时也会引入字符串索引类型，如果K包含number类型，那个同时也会引入数字索引类型。
* */
{
  const c = "c";
  const d = 10;
  const e = Symbol();
}
let n = map1.length;
let x = map1[123]; // Previously of type any (or an error with --noImplicitAny)
/**
 * 此外，由于keyof支持用number和symbol命名的键值，
 * 现在可以对对象的数字字面量（如数字枚举类型）和唯一的symbol属性的访问进行抽象。
 * */
{
  const enumToStringMap = {
    [0 /* A */]: "Name A",
    [1 /* B */]: "Name B",
    [2 /* C */]: "Name C",
  };
  const sym1 = Symbol();
  const sym2 = Symbol();
  const sym3 = Symbol();
  const symbolToNumberMap = {
    [sym1]: 1,
    [sym2]: 2,
    [sym3]: 3,
  };
  function getValue(obj, key) {
    return obj[key];
  }
  let x1 = getValue(enumToStringMap, 2 /* C */); // Returns "Name C"
  let x2 = getValue(symbolToNumberMap, sym3); // Returns 3
}
/**
 * 之前，keyof操作符和映射类型只支持string命名的属性。
 * 那些把总是把keyof T的类型当做string的代码现在会报错
 * */
{
  function useKey(o, k) {
    // var name: string = k;  // 错误：keyof T不能赋值给字符串
  }
  // 如果函数只能处理字符串命名属性的键，在声明里使用Extract<keyof T, string>
  function useKey1(o, k) {
    var name = k; // OK
  }
  // 如果函数能处理任何属性的键，那么可以在下游进行改动
  function useKey2(o, k) {
    var name = k;
  }
}
//# sourceMappingURL=2.9 keyof和映射类型支持用number和symbol命名的属性.js.map
