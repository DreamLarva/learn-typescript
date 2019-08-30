/**
 * 前提 请看  协变(covariance) 和 抗变(contravariance).md 部分 最后一段
 *
 * 如果类似的情况 就不能保证类型的安全了
 * */
declare class Animal {
    a: number;
}
declare class Dog extends Animal {
    b: number;
}
declare class Cat extends Animal {
    c: number;
}
declare const dog_list: Dog[];
declare const animal_list: Animal[];
/**
 * 结论 为了避免类型问题
 * 如果 这个引用类型 非只读
 * 在 引用类型 赋值的时候 等号左侧的类型 只能收窄 不能放宽
 * */
