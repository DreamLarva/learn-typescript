/**
 * 类型别名
 * 类型别名会给一个类型起个新名字。
 *
 * *** 可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型 ***
 * 不能当接口 或者 class 使用 不能使用在 泛型<>中
 * */
{
  type Name = string;
  type NameResolver = () => string;
  type NameOrResolver = Name | NameResolver;

  class A {}

  type B = A;

  function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
      return n;
    } else {
      return n();
    }
  }
}
/** 泛型 */
{
  type Container<T> = { value: T };
  type Tree<T> = {
    value: T;
    left?: Tree<T>;
    right?: Tree<T>;
  };

  let temp: Tree<string>;
  temp = {
    value: "text",
    left: { value: "text" },
  };
}
/** 交叉类型  */
{
  type LinkList<T> = T & { next?: LinkList<T> };

  interface Person {
    name: string;
  }

  let people: LinkList<Person>;
  people = {
    name: "1",
  };
  let s = people.name;
  s = people.next!.name;
  s = people.next!.next!.name;
  s = people.next!.next!.next!.name;

  // 交叉类型中有 同名的属性时
  // 值 没有交集 返回 never
  // 有交集 则收窄
  type o1 = { a: 1 };
  type o2 = { a: 2 };
  type o3 = { a: 1 | 2 };
  type o4 = { a: 3 | 4 };
  type o5 = { a: number };
  type o6 = { a: 1 | 3 };

  type u1 = o1 & o2; // never

  type u2 = o2 & o3; // {a:2} 正常收窄
  // let u2_1: u2 = { a: 1 }; // error
  let u2_2: u2 = { a: 2 };

  type u3 = o3 & o4; // never

  type u4 = o1 & o5; // { a: 1 } 还是正常收窄

  let u4_1: u4 = { a: 1 };
  // let u4_2: u4 = { a: 2 }; // error

  type u5 = o3 & o5; //
  let u5_1: u5 = { a: 1 };
  // let u5_2: u5 = { a: 3 }; // error

  type u6 = o6 & o3; // {a:1} 有交集 取交集
  let u6_1: u6 = { a: 1 };
  // let u6_2:u6 = {a:3}
}
/** 接口 vs. 类型别名 */
/**
 * 1.接口创建了一个新的名字,类型别名并不创建新名字(可以声明同名变量)
 * 2.类别名不能被 extends 和 implements 继承（自己也不能 extends和 implements其它类型）
 * 3.如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。
 * */
type Alias = { num: number };

interface Interface {
  num: number;
}

let Alias = 123;

// declare 只能在顶级作用域使用
declare function aliased(arg: Alias): Alias;

declare function interfaced(arg: Interface): Interface;

export {};
