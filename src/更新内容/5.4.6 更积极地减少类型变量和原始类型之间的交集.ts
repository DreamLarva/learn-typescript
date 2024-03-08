/**
 * TypeScript now reduces intersections with type variables and primitives more aggressively,
 * depending on how the type variable’s constraint overlaps with those primitives.
 * TypeScript 现在更积极地减少与类型变量和基元的交叉，具体取决于类型变量的约束与这些基元的重叠方式。
 *
 * 有关更多信息，请参阅此处的更改。
 * https://github.com/microsoft/TypeScript/pull/56515
 * */
declare function intersect<T, U>(x: T, y: U): T & U;

function foo<T extends "abc" | "def">(x: T, str: string, num: number) {
  // Was 'T & string', now is just 'T'
  let a = intersect(x, str);

  // Was 'T & number', now is just 'never'
  let b = intersect(x, num);

  // Was '(T & "abc") | (T & "def")', now is just 'T'
  let c = Math.random() < 0.5 ? intersect(x, "abc") : intersect(x, "def");
}

export {};
