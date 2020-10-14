/**
 * 大多数情况下，枚举是十分有效的方案。 然而在某些情况下需求很严格。
 * 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 const枚举。
 * 常量枚举通过在枚举上使用 const修饰符来定义。
 * */
let directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
// let directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
const a = 1;
// const b:Directions = ""; // error
const c = 1; /* Down */
export {};
//# sourceMappingURL=7.4 const枚举.js.map
