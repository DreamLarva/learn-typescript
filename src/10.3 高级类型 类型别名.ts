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

    class A {
    }

    type B = A;

    function getName(n: NameOrResolver): Name {
        if (typeof n === "string") {
            return n
        } else {
            return n()
        }
    }

}
/** 泛型 */
{
    type Container<T> = { value: T }
    type Tree<T> = {
        value: T,
        left?: Tree<T>;
        right?: Tree<T>;
    }

    let temp: Tree<string>;
    temp = {
        value: "text",
        left: {value: "text"}
    }
}
/** 交叉类型  */
{
    type LinkList<T> = T & { next?: LinkList<T> }

    interface Person {
        name: string
    }

    let people: LinkList<Person>;
    people = {
        name: "1",
    };
    let s = people.name;
    s = people.next!.name;
    s = people.next!.next!.name;
    s = people.next!.next!.next!.name;
}
/** 接口 vs. 类型别名 */
/**
 * 1.接口创建了一个新的名字,类型别名并不创建新名字(可以声明同名变量)
 * 2.类别名不能被 extends 和 implements 继承（自己也不能 extends和 implements其它类型）
 * 3.如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。
 * */
type Alias = { num: number }

interface Interface {
    num: number;
}

let Alias = 123;

// declare 只能在顶级作用域使用
declare function aliased(arg: Alias): Alias;

declare function interfaced(arg: Interface): Interface;

export {}
