/**
 * The first change is that spreads in tuple type syntax can now be generic.
 * This means that we can represent higher-order operations on tuples and arrays even when we don’t know the actual
 * types we’re operating over. When generic spreads are instantiated (or, replaced with a real type) in these tuple types,
 * they can produce other sets of array and tuple types.
 *
 * 展开元组 可以泛型化
 * 这意味着我们不需要知道要操作的实际类型，我们也可以表示元组和数组的高阶操作。
 * 当在这些元组类型中实例化通用扩展时（或用 实际类型替换），它们可以产生其他数组和元组类型集。
 * */
{
  // 取元组的 除第一个值外的所有值
  function tail<T extends any[]>(arr: readonly [any, ...T]) {
    const [_ignored, ...rest] = arr;
    return rest;
  }

  const myTuple = [1, 2, 3, 4] as const;
  const myArray = ["hello", "world"];

  const r1 = tail(myTuple);
  //    ^ = const r1: [2, 3, 4]

  const r2 = tail([...myTuple, ...myArray] as const);
  //    ^ = const r2: [2, 3, 4, ...string[]]
}
/**
 * The second change is that rest elements can occur anywhere in a tuple - not just at the end!
 * 第二个变化时 元组中 rest(这里应该是 spread 吧) 操作符可以在任意位置, 而不是只是最后一个位置
 * */
{
  type Strings = [string, string];
  type Numbers = [number, number];

  type StrStrNumNumBool = [...Strings, ...Numbers, boolean];
  //   ^ = type StrStrNumNumBool = [string, string, number, number, boolean]
}
/**
 * 注意 如果展开的内容没有 确切的长度, 那么产生的类型就会没有边界
 * 现在 数组类型 只能出出现在 元组的最后一个位置 否则报错
 * */
{
  type Strings = [string, string];
  type Numbers = number[];
  type Unions = (number | null)[];

  // type Unbounded1 = [...Strings, ...Numbers, boolean]; // error

  // type Unbounded2 = [...Strings, ...Unions, boolean]; // error

  // type Unbounded3 = [...Unions,...Numbers] // error
}
{
  type Arr = readonly any[];

  function concat<T extends Arr, U extends Arr>(
    arr1: T,
    arr2: U
  ): [...T, ...U] {
    // return 的类型是必须的
    return [...arr1, ...arr2];
  }

  concat([1, 2] as const, ["3", true] as const); // [1,2,"3",true]
}

/**
 * 应用在函数式中
 * */
{
  type Arr = readonly unknown[];

  function partialCall<T extends Arr, U extends Arr, R>(
    f: (...args: [...T, ...U]) => R,
    ...headArgs: T
  ) {
    return (...tailArgs: U) => f(...headArgs, ...tailArgs);
  }

  const foo = (x: string, y: number, z: boolean) => {};

  // const f1 = partialCall(foo, 100);
  // Argument of type 'number' is not assignable to parameter of type 'string'.

  // const f2 = partialCall(foo, "hello", 100, true, "oops");
  // Expected 4 arguments, but got 5.

  // This works!
  const f3 = partialCall(foo, "hello");
  //    ^ = const f3: (y: number, z: boolean) => void

  // What can we do with f3 now?

  // Works!
  f3(123, true);

  // f3();
  // Expected 2 arguments, but got 0.

  // f3(123, "hello");
  // Argument of type 'string' is not assignable to parameter of type 'boolean'.
}

{
  // Variadic tuple elements

  type Foo<T extends unknown[]> = [string, ...T, number];

  type T1 = Foo<[boolean]>; // [string, boolean, number]
  type T2 = Foo<[number, number]>; // [string, number, number, number]
  type T3 = Foo<[]>; // [string, number]

  // Strongly typed tuple concatenation

  function concat<T extends unknown[], U extends unknown[]>(
    t: [...T],
    u: [...U]
  ): [...T, ...U] {
    return [...t, ...u];
  }

  const ns = [0, 1, 2, 3]; // number[]

  const t1 = concat([1, 2], ["hello"]); // [number, number, string]
  const t2 = concat([true], t1); // [boolean, number, number, string]
  const t3 = concat([true], ns); // [boolean, ...number[]]

  // Inferring parts of tuple types
  // function foo1<T extends string[], U>(...args: [...T, () => void]): T // 没法实现这个 返回值是 T啊
  function foo1<T extends string[], U>(...args: [...T, () => void]): void {}

  foo1(() => {}); // []
  foo1("hello", "world", () => {}); // ["hello", "world"]
  // foo1("hello", 42, () => {}); // Error, number not assignable to string

  // Inferring to a composite tuple type

  function curry<T extends unknown[], U extends unknown[], R>(
    f: (...args: [...T, ...U]) => R,
    ...a: T
  ) {
    return (...b: U) => f(...a, ...b);
  }

  const fn1 = (a: number, b: string, c: boolean, d: string[]) => 0;

  const c0 = curry(fn1); // (a: number, b: string, c: boolean, d: string[]) => number
  const c1 = curry(fn1, 1); // (b: string, c: boolean, d: string[]) => number
  const c2 = curry(fn1, 1, "abc"); // (c: boolean, d: string[]) => number
  const c3 = curry(fn1, 1, "abc", true); // (d: string[]) => number
  const c4 = curry(fn1, 1, "abc", true, ["x", "y"]); // () => number
}

/**
 * 类型间的关系
 * */
{
  /**
   * Generally, a tuple type S is related to a tuple type T by pairwise relating elements of S to the elements of T. Variadic elements are processed as follows:
   * 1. 类型S 中可变元素...U在S , T中 可变元素...V， 如果U是 is related to V, 则 S is related to V。
   * 2. 类型S 中可变元素...U, T类型中 rest element ...X[], 如果 U is related to X[] , 则 S is related to V
   * */
  function foo1<T extends unknown[], U extends T>(
    x: [string, ...unknown[]],
    y: [string, ...T],
    z: [string, ...U]
  ) {
    x = y; // Ok
    x = z; // Ok
    // y = x; // Error
    y = z; // Ok
    // z = x; // Error
    // z = y; // Error
  }

  /**
   * Tuple types with single variadic elements have the following relations:
   * 元组类型拥有一个 可变元素有以下关系
   * 1. [...T] is related to T.
   * 2. T is related to readonly [...T].
   * 3. T is related to [...T] when T is constrained to a mutable array or tuple type.
   * */
  function foo2<T extends readonly unknown[]>(
    t: T,
    m: [...T],
    r: readonly [...T]
  ) {
    t = m; // Ok
    // t = r; // Error
    // m = t; // Error
    // m = r; // Error
    r = t; // Ok
    r = m; // Ok
  }
}
/*
Inference between tuple types with the same structure (i.e. same number of elements and fixed, variadic, or rest kind matched to the same kind in each position), simply infers pairwise between the element types. For example, inference from [string, ...Partial<S>, number?] to [string, ...T, number?] infers Partial<S> for T.

Inference between tuple types S and T with different structure divides each tuple into a starting fixed part, a middle part, and an ending fixed part. Any one of these parts may be empty.

The starting fixed parts of S and T consist of those elements in S and T that are fixed (i.e. neither variadic nor rest elements) in both types matching from the start of each type.

If T contains at least one variadic element and S has no ending rest element, the ending fixed parts of S and T consist of those elements in S and T that are fixed in both types matching from the end of each type.

If T contains at least one variadic element and S has an ending rest element, the ending fixed part of T consists of those elements in T that are fixed matching from the end of the type, and the ending fixed part of S is empty.

If T contains no variadic elements, the ending fixed parts of S and T are empty.

The middle parts of S and T are those elements in S and T that remain between the starting and ending fixed parts of the types respectively.

Inference then proceeds as follows:

Pairwise infer between the elements in the starting parts.

If the middle part of S is a single rest element, infer from that rest element to every element in the middle part of T.

If the middle part of T is a single variadic or rest element, infer from a tuple consisting of the middle part of S to that variadic or rest element.

If the middle part of T is exactly two variadic elements ...A and ...B, and an implied arity exists for A, infer from a tuple consisting of the initial middle part of S to A and from a tuple consisting of the remaining middle part of S to B, where the length of the initial middle part corresponds to the implied arity for A.

Pairwise infer between the elements in the ending parts, or infer from the rest element in S to the elements of the ending part of T.

In the context of inference for a call of a generic function with a rest parameter R, the implied arity for R is the number of rest arguments supplied for R. In all other contexts, a type parameter has no implied arity. For an example of inference involving an implied arity, see the curry function in the introduction.
* */
/**
 * Type inference
 * 类型推断
 * 注意 元组中的 infer 不能被括号包裹
 * */
{
  type First<T extends readonly unknown[]> = T[0];
  type DropFirst<T extends readonly unknown[]> = T extends readonly [
    any?,
    ...infer U // 不能有括号否则报错
  ]
    ? U
    : [...T];
  type Last<T extends readonly unknown[]> = T extends readonly [
    ...infer _,
    infer U
  ]
    ? U
    : T extends readonly [...infer _, (infer U)?] /* prettier-ignore */
    ? U | undefined
    : undefined;
  type DropLast<T extends readonly unknown[]> = T extends readonly [
    ...infer U,
    any?
  ]
    ? U
    : [...T];

  type T1 = First<[number, boolean, string]>; // [number]
  type T2 = DropFirst<[number, boolean, string]>; // [boolean, string]
  type T3 = Last<[number, boolean, string]>; // [string]
  type T4 = DropLast<[number, boolean, string]>; // [number, boolean]
}

/**
 * Spreads in array literals
 * 在数组中 展开字面量
 * */
{
  /**
   * When an array literal has a tuple type, a spread of a value of a generic array-like type produces a variadic element.
   * */
  function foo3<T extends unknown[], U extends unknown[]>(
    t: [...T],
    u: [...U]
  ) {
    return [1, ...t, 2, ...u, 3] as const; // readonly [1, ...T, 2, ...U, 3]
  }

  const t = foo3(["hello"], [10, true]); // readonly [1, string, 2, number, boolean, 3]
}

/**
 * When the contextual type of an array literal is a tuple type,
 * a tuple type is inferred for the array literal.
 * The type [...T], where T is an array-like type parameter,
 * can conveniently be used to indicate a preference for inference of tuple types:
 * */
declare function ft1<T extends unknown[]>(t: T): T;

declare function ft2<T extends unknown[]>(t: T): readonly [...T];

declare function ft3<T extends unknown[]>(t: [...T]): T;

declare function ft4<T extends unknown[]>(t: [...T]): readonly [...T];

ft1(["hello", 42]); // (string | number)[]
ft2(["hello", 42]); // readonly (string | number)[]
ft3(["hello", 42]); // [string, number]
ft4(["hello", 42]); // readonly [string, number]

/**
 * Indexing and destructuring
 * 索引和解构
 * */
{
  /**
   * Indexing and destructuring of generic tuple types appropriately recognizes fixed elements at the start of the tuple type.
   * Beyond the fixed elements, the type is simply a union of the remaining element types.
   * */
  function f1<T extends unknown[]>(t: [string, ...T], n: number) {
    const a = t[0]; // string
    const b = t[1]; // [string, ...T][1]
    const c = t[2]; // [string, ...T][2]
    const d = t[n]; // [string, ...T][number]
  }

  function f2<T extends unknown[]>(t: [string, ...T, number], n: number) {
    const a = t[0]; // string
    const b = t[1]; // [string, ...T, number][1]
    const c = t[2]; // [string, ...T, number][2]
    const d = t[n]; // [string, ...T, number][number]
  }

  function f3<T extends unknown[]>(t: [string, ...T]) {
    let [...ax] = t; // [string, ...T]
    let [b1, ...bx] = t; // string, [...T]
    let [c1, c2, ...cx] = t; // string, [string, ...T][1], T[number][]
  }

  function f4<T extends unknown[]>(t: [string, ...T, number]) {
    let [...ax] = t; // [string, ...T, number]
    let [b1, ...bx] = t; // string, [...T, number]
    let [c1, c2, ...cx] = t; // string, [string, ...T, number][1], (number | T[number])[]
  }
}

/**
 * Rest parameters and spread arguments
 * */
/**
 * Spread expressions with fixed length tuples are now appropriately flattened in argument lists. For example:
 * */
declare function fs1(a: number, b: string, c: boolean, ...d: number[]): void;

function fs2(t1: [number, string], t2: [boolean], a1: number[]) {
  fs1(1, "abc", true, 42, 43, 44);
  fs1(...t1, true, 42, 43, 44);
  fs1(...t1, ...t2, 42, 43, 44);
  fs1(...t1, ...t2, ...a1);
  // fs1(...t1);  // Error: Expected at least 3 arguments, but got 2
  // fs1(...t1, 45);  // Error: Type '45' is not assignable to type 'boolean'
}

/**
 * A rest parameter of a generic tuple type can be used to infer types from the middle part of argument lists. For example:
 * */
declare function fr1<T extends unknown[]>(
  x: number,
  ...args: [...T, number]
): T;

function fr2<U extends unknown[]>(u: U) {
  fr1(1, 2); // []
  fr1(1, "hello", true, 2); // [string, boolean]
  fr1(1, ...u, "hi", 2); // [...U, string]
  // 然而这里没有报错 ???
  fr1(1); //  Error: Expected 2 arguments, but got 1
}

/**
 * Application of mapped types
 * When a mapped type is applied to a generic tuple type, non-variadic elements are eagerly mapped but variadic elements continue to be generic.
 * Effectively, M<[A, B?, ...T, ...C[]] is resolved as [...M<[A]>, ...M<[B?]>, ...M<T>, ...M<C[]>]. For example:
 * */
{
  type TP1<T extends unknown[]> = Partial<[string, ...T, number]>; // [string?, ...Partial<T>, number?]
}

export {};
