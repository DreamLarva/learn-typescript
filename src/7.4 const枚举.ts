/**
 * 大多数情况下，枚举是十分有效的方案。 然而在某些情况下需求很严格。
 * 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 const枚举。
 * 常量枚举通过在枚举上使用 const修饰符来定义。
 * */

/** 常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。
 *  常量枚举成员在使用的地方会被内联进来。*/
const enum Enum {
    A = 1,
    B = A * 2
}


/** const枚举并不生成 新的枚举变量的容器 */
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// let directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

const a: Directions = 1;
// const b:Directions = ""; // error
const c: Directions = Directions.Down;
// const d:Directions = {}; // error


export {}
