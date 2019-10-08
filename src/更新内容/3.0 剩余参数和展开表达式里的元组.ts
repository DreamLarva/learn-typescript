/**
 * 带元组类型的剩余参数
 * 当剩余参数里有元组类型时，元组类型被扩展为离散参数序列。 例如，如下两个声明是等价的：
 * */
{
    type foo1 = (...args: [number, string, boolean]) => void;
    // const foo1:foo1 =  (a,b,c,d) =>{  } // error 不能多
    // const foo2:foo1 =  (a,b) =>{  } // 少参数是正常兼容的
    type foo2 = (args_0: number, args_1: string, args_2: boolean) => void;
}

/**
 * 带有元组类型的展开表达式
 * 在函数调用中，若最后一个参数是元组类型的展开表达式，那么这个展开表达式相当于元组元素类型的离散参数序列。
 * 因此，下面的调用都是等价的：
 * */
{
    function foo(a: number, b: string, c: boolean) {

    }

    const args: [number, string, boolean] = [42, "hello", true];
    foo(42, "hello", true);
    foo(args[0], args[1], args[2]);
    foo(...args);
}

/**
 * 泛型剩余参数
 * 剩余参数允许带有泛型类型，这个泛型类型被限制为是一个数组类型，
 * 类型推断系统能够推断这类泛型剩余参数里的元组类型。
 * 这样就可以进行高阶捕获和展开部分参数列表:
 * */

declare function bind<T, U extends any[], V>(f: (x: T, ...args: U) => V, x: T): (...args: U) => V;

declare function f3(x: number, y: string, z: boolean): void;

const f2 = bind(f3, 42);  // (y: string, z: boolean) => void
const f1 = bind(f2, "hello");  // (z: boolean) => void
const f0 = bind(f1, true);  // () => void

f3(42, "hello", true);
f2("hello", true);
f1(true);
f0();

