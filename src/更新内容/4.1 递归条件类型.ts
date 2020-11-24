{
  type ElementType<T> = T extends ReadonlyArray<infer U> ? ElementType<U> : T;

  function deepFlatten<T extends readonly unknown[]>(x: T): ElementType<T>[] {
    throw "not implemented";
  }

  // All of these return the type 'number[]':
  deepFlatten([1, 2, 3]);
  deepFlatten([[1], [2, 3]]);
  deepFlatten([[1], [[2]], [[[3]]]]);
}

/**
 * 获取 递归的 Promise 的值
 * */
{
  type Awaited<T> = T extends null | undefined
    ? T
    : T extends PromiseLike<infer U>
    ? Awaited<U>
    : T;

  type P1 = Awaited<Promise<string>>; // string
  type P2 = Awaited<Promise<Promise<string>>>; // string
  type P3 = Awaited<Promise<string | Promise<Promise<number> | undefined>>>; // string | number | undefined
}
{
  // Flattening arrays

  type Flatten<T extends readonly unknown[]> = T extends unknown[]
    ? _Flatten<T>[]
    : readonly _Flatten<T>[];
  type _Flatten<T> = T extends readonly (infer U)[] ? _Flatten<U> : T;

  type InfiniteArray<T> = InfiniteArray<T>[];

  type A1 = Flatten<string[][][]>; // string[]
  type A2 = Flatten<string[][] | readonly (number[] | boolean[][])[]>; // string[] | readonly (number | boolean)[]
  type A3 = Flatten<InfiniteArray<string>>;
  // type A4 = A3[0];  // Infinite depth error

  // Repeating tuples

  type TupleOf<T, N extends number> = N extends N
    ? number extends N
      ? T[]
      : _TupleOf<T, N, []>
    : never;
  //          元组的类型  重复的次数       存储结果
  type _TupleOf<
    T,
    N extends number,
    R extends unknown[]
  > = R["length"] extends N ? R : _TupleOf<T, N, [T, ...R]>;

  type T1 = TupleOf<string, 3>; // [string, string, string]
  type T2 = TupleOf<number, 0 | 2 | 4>; // [] | [number, number] | [number, number, number, number]
  type T3 = TupleOf<number, number>; // number[]
  // type T4 = TupleOf<number, 100>;  // Depth error
}

interface Box<T> {
  value: T;
}

type RecBox<T> = T | Box<RecBox<T>>;

declare function unbox<T>(box: RecBox<T>): T;

type T1 = Box<string>;
type T2 = Box<T1>;
type T3 = Box<T2>;
type T4 = Box<T3>;
type T5 = Box<T4>;
type T6 = Box<T5>;

declare let b1: Box<Box<Box<Box<Box<Box<string>>>>>>;
declare let b2: T6;

unbox(b1); // string
unbox(b2); // string (previously T6)
unbox({ value: { value: { value: 5 } } }); // number (previously { value: { value: number }})

{
  interface Options {
    path: string;
    permissions: number;

    // Extra properties are caught by this index signature.
    [propName: string]: string | number;
  }

  function checkOptions(opts: Options) {
    opts.path; // string
    opts.permissions; // number

    // These are all allowed too!
    // They have the type 'string | number'.
    const a = opts.yadda;
    const b = opts["foo bar baz"];
    const c = opts[Math.random()];
  }
}

export {};
