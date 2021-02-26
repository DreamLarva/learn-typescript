"use strict";
/**
 * 前提 请看  协变(covariance) 和 抗变(contravariance).md 部分 最后一段
 *
 * 如果类似的情况 就不能保证类型的安全了
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
const dog_list = [new Dog(), new Dog()];
// 全是狗的数组 赋值给 动物(狗的父类型) 数组的类型 ts 能够接受
const animal_list = dog_list;
// 但是 这里是 引用类型 animal_list 指向 dog_list
// 但是 这边的 数组 又是 可变的
// 导致 dog_list 和 animal_list 同时都改变了
animal_list.push(new Cat());
// 现在 animal_list 中 既有 Dog 类型 又有 Cat 类型 但是都符合 Animal 类型
// 但是 dog_list 中既有 Dog 类型 又有 Cat 类型 这就不符合 Dog 类型了
// 这样的话在遍历 dog_list 的 时候就可能出问题
/**
 * 结论 为了避免类型问题
 * 如果 这个引用类型 非只读
 * 在 引用类型 赋值的时候 等号左侧的类型 只能收窄 不能放宽
 * */
//# sourceMappingURL=%E6%95%B0%E7%BB%84%E5%85%BC%E5%AE%B9%E6%80%A7%E9%97%AE%E9%A2%98.js.map