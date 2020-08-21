/**
 * 考虑下面这个 Animal 是 Dog 和 Cat 的父类型的例子
 * */
class Animal {
    constructor() {
        this.a = 1;
    }
}
class Dog extends Animal {
    constructor() {
        super(...arguments);
        this.b = 2;
    }
}
class Cat extends Animal {
    constructor() {
        super(...arguments);
        this.c = 3;
    }
}
/**
 * 还有一点就是 因为这里的匹配是鸭子辩型
 * 所以如果 类型中没有 确切不同成员 typescript 依然会认为 Dog 和 Cat 是可能兼容的
 * */
// f1 = f2;  // 启用 --strictFunctionTypes 时错误
f2 = f1; // 正确
// animalComparer = dogComparer;  // 错误 因为 T 是 抗变的
dogComparer = animalComparer; // 正确
/**
 * 抗变位置相关的类型推导
 * 修改 自 2.6 更新文档的 示例
 * */
function combine(...funcs) {
    return x => {
        for (const f of funcs)
            f(x);
    };
}
function animalFunc(x) {
    return x;
}
function dogFunc(x) {
    return x;
}
function catFunc(x) {
    return x;
}
let combined1 = combine(dogFunc, animalFunc);
let combined2 = combine(animalFunc, dogFunc); // 文档上写 (x: Dog) => void 然而实际是 (x:Animal)=>void
let combined3 = combine(animalFunc, catFunc);
export {};
//# sourceMappingURL=2.6 严格函数类型.js.map