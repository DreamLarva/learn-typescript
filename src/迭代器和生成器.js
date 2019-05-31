"use strict";
/**
 * 当一个对象实现了Symbol.iterator属性时，我们认为它是可迭代的。 一些内置的类型如
 * Array，Map，Set，String，Int32Array，Uint32Array等
 * 都已经实现了各自的Symbol.iterator。 对象上的 Symbol.iterator函数负责返回供迭代的值。
 * */
Object.defineProperty(exports, "__esModule", { value: true });
{
    let someArray = [1, "string", false];
    for (let entry of someArray) {
        console.log(entry); // number | string | boolean
    }
}
/**
 * for..of vs. for..in 语句
 * for..of和for..in均可迭代一个列表；但是用于迭代的值却不同，for..in迭代的是对象的 键 的列表，而for..of则迭代对象的键对应的值。
 * */
{
    let list = [4, 5, 6];
    for (let i in list) {
        console.log(i); // i:string
    }
    for (let i of list) {
        console.log(i); // i:number
    }
}
/**
 * 另一个区别是for..in可以操作任何对象；它提供了查看对象属性的一种方法。 但是 for..of关注于迭代对象的值。
 * 内置对象Map和Set已经实现了Symbol.iterator方法，让我们可以访问它们保存的值。
 * */
{
    let pets = new Set(["Cat", "Dog", "Hamster"]);
    // (pets)["species"] = "mammals"; // 这里报错 不能够这样赋值 因为 Set 类型里面没有 索引类型的声明
    for (let pet in pets) {
        console.log(pet); // "species"
    }
    for (let pet of pets) {
        console.log(pet); // "Cat", "Dog", "Hamster"
    }
}
/**
 * 生成器返回的是 必须是
 * IterableIterator<T>类型
 * 且泛型T 必须包含所有yield 后可能返回的类型
 * */
{
    function* A1() {
        yield "string";
        yield 1;
    }
    for (const a of A1()) {
        // a 被推断为 number | string
    }
    function* A2() {
        yield true;
        yield 1;
    }
    for (const a of A2()) {
        // 说明 迭代器 推断都是联合类型
        // a 被推断为  true | 1
    }
    function* A3() {
        yield* A1();
        yield* A2();
    }
    for (const a of A3()) {
        // a 被推断为 number | string | true | 1
    }
    function* B1() {
        while (true) {
            yield 1;
            yield Promise.resolve(1);
        }
    }
    function* B2() {
        while (true) {
            yield* A3();
            yield Promise.resolve(1);
        }
    }
    for (const a of B2()) {
        // a 被推断为 number | string | true | 1 | Promise<1>
    }
}
//# sourceMappingURL=迭代器和生成器.js.map