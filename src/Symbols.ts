let sym1 = Symbol();
let sym2 = Symbol("key"); // 可选的字符串key
let sym3 = Symbol("key");

/**
 * 注意 let 初始化的 类型为 symbol
 * 而 const 初始化的 类型为 unique symbol
 *
 * unique symbols是 symbols的子类型
 * */
{
  let a = Symbol();
  const b = a; // b 类型为 symbol

  const c = Symbol();
  let d = c; // d 类型为 symbol
}

// symbols是唯一的
sym2 === sym3; // false,

// 可以互相赋值
sym2 = sym3;
sym2 = sym1;

// 像字符串一样，symbols也可以被用做对象属性的键。
const sym = Symbol(); // 注意必须是用 const 初始化

let obj = {
  a: 1,
  [sym]: "value",
};

console.log(obj[sym]); // "value"

{
  let sym = Symbol(); // 注意必须是用 const 初始化

  let obj = {
    a: 1,
    [sym]: "value",
  };

  // console.log(obj[sym]); // error
}

// Symbols也可以与计算出的属性名声明相结合来声明对象的属性和类成员。
const getClassNameSymbol = Symbol(); // 同样必须const

class C {
  [getClassNameSymbol]() {
    return "C";
  }
}

let c = new C();
let className = c[getClassNameSymbol](); // "C"

/*
除了用户定义的symbols，还有一些已经众所周知的内置symbols。 内置symbols用来表示语言内部的行为。

以下为这些symbols的列表：

Symbol.hasInstance
方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。

Symbol.isConcatSpreadable
布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。

Symbol.iterator
方法，被for-of语句调用。返回对象的默认迭代器。

Symbol.match
方法，被String.prototype.match调用。正则表达式用来匹配字符串。

Symbol.replace
方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。

Symbol.search
方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。

Symbol.species
函数值，为一个构造函数。用来创建派生对象。

Symbol.split
方法，被String.prototype.split调用。正则表达式来用分割字符串。

Symbol.toPrimitive
方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。

Symbol.toStringTag
方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。

Symbol.unscopables
对象，它自己拥有的属性会被with作用域排除在外。
*/

export {};
