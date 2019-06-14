/**
 * 考虑下面这个 Animal 是 Dog 和 Cat 的父类型的例子
 * */
class Animal {
    a = 1
}

class Dog extends Animal {
    b = 2
}

class Cat extends Animal {
    c = 3
}

declare let f1: (x: Animal) => void;
declare let f2: (x: Dog) => void;
declare let f3: (x: Cat) => void;

/**
 * 还有一点就是 因为这里的匹配是鸭子辩型
 * 所以如果 类型中没有 确切不同成员 typescript 依然会认为 Dog 和 Cat 是可能兼容的
 * */
// f1 = f2;  // 启用 --strictFunctionTypes 时错误
f2 = f1;  // 正确
// f2 = f3;  // 错误

/**
 * 默认类型检查模式中 T在类型 (x: T) => void是 双变的（也即协变 或抗变），
 * 但在严格函数类型模式中 T是 抗变的。
 * */

declare let animalComparer: Comparer<Animal>;
declare let dogComparer: Comparer<Dog>;

interface Comparer<T> {
    compare: (a: T, b: T) => number;
}

// animalComparer = dogComparer;  // 错误 因为 T 是 抗变的
dogComparer = animalComparer;  // 正确
/**
 * 抗变位置相关的类型推导
 * 修改 自 2.6 更新文档的 示例
 * */
function combine<T, U>(...funcs: ((x: T) => U)[]): (x: T) => void {
    return x => {

        for (const f of funcs) f(x);

    }
}

function animalFunc(x: Animal) {
    return x
}

function dogFunc(x: Dog) {
    return x
}
function catFunc(x: Cat) {
    return x
}

//                                            error
let combined = combine(dogFunc,animalFunc,/* catFunc */);
// 此处推断的与 文档的不同 (x: Animal) => void
// 文档中写的是 (x: Dog) => void  ??????搞毛
/**
 * ???
 * 这上面所有 T的推断都来自抗变的位置，由此我们得出 T的 最普遍子类型。
 * 这与从协变位置推导出的结果恰恰相反，从协变位置我们得出的是 最普遍超类型。
 * ????
 * */






export {}
