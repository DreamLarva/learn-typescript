import { sample } from "lodash-es";

type sample = {
  a: 1;
  b: number;
  c: string;
  d: boolean;
  e: () => void;
};

/**
 * Make all properties in T optional
 * 将泛型 T 中所有的属性 设置为 可选 (?)
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Partial_1 = Partial<sample>;

/**
 * Make all properties in T required
 * 将泛型 T 中所有的属性 设置为 必须
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};
type Required_1 = Required<Partial_1>;

/**
 * Make all properties in T readonly
 * 将泛型 T 中所有的 属性设置为 只读
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
type Readonly_1 = Readonly<sample>;

/**
 * From T, pick a set of properties whose keys are in the union K
 * 返回 泛型 T 中 索引 K 的那些 组成一个新的 类型
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type Pick_1 = Pick<sample, "a" | "b">;

/**
 * Construct a type with a set of properties K of type T
 * 返回一个索引类型 索引的类型为K 属性类型为T
 * keys of any 代表类型 number | string | symbol
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
type Record_1 = Record<"key", sample>;
const record: Record_1 = {
  key: {
    a: 1,
    b: 1,
    c: "string",
    d: true,
    e: () => {},
  },
};

/**
 * Exclude from T those types that are assignable to U
 * 从T中剔除可以赋值给U的类型
 */
type Exclude<T, U> = T extends U ? never : T;
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "b" | "d"
type T02 = Exclude<string | number | (() => void), Function>; // string | number

/**
 * Extract from T those types that are assignable to U
 *  提取T中可以赋值给U的类型。
 */
type Extract<T, U> = T extends U ? T : never;
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "a" | "c"
type T03 = Extract<string | number | (() => void), Function>; // () => void

/**
 * Exclude null and undefined from T
 * 从T中剔除null和undefined。
 */
type NonNullable<T> = T extends null | undefined ? never : T;
type T04 = NonNullable<string | number | undefined>; // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>; // (() => string) | string[]

/**
 * Obtain the parameters of a function type in a tuple
 * 获取函数的参数类型
 */
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
const Parameters_1: Parameters<() => void> = []; // 无参数 就是 空数组

/**
 * Obtain the parameters of a constructor function type in a tuple
 * 获取构造函数的 参数类型
 */
type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;

/**
 * Obtain the return type of a function type
 * 获取函数返回值类型。
 */
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

function f1(s: string) {
  return { a: 1, b: s };
}

class C {
  x = 0;
  y = 0;
}

type T10 = ReturnType<() => string>; // string
type T11 = ReturnType<(s: string) => void>; // void
type T12 = ReturnType<<T>() => T>; // {}
type T13 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T14 = ReturnType<typeof f1>; // { a: number, b: string }
type T15 = ReturnType<any>; // any
type T16 = ReturnType<never>; // any
// type T17 = ReturnType<string>;  // Error
// type T18 = ReturnType<Function>;  // Error

/**
 * Obtain the return type of a constructor function type
 * 获取构造函数类型的实例类型。
 * 类似 typeof 的逆操作
 */
type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;
type T20 = InstanceType<typeof C>; // C
type T21 = InstanceType<any>; // any
type T22 = InstanceType<never>; // any
// type T23 = InstanceType<string>;  // Error
// type T24 = InstanceType<Function>;  // Error
// 输入的泛型 应当是一个构造函数
// ts 默认认为 class 是一个实例的类型 所以要加上 typeof 才是一个 构造函数的类型
// type T25 = InstanceType<C>;  // Error Type 'C' does not satisfy the constraint 'new (...args: any) => any'
type T26 = typeof C; // 提示类型 {new():C,prototype:C}

/**
 * from 3.5.0 为ts 默认
 * 从类型 T 中排除 key 是 类型 T 的类型s
 * */
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Omit_1 = Omit<sample, "a" | "b" | "c" | "e">;
const Omit_1_1: Omit_1 = { d: true }; // 排除了属性 a,b,c,e 现在只能有d

/**
 * airbnb 的类型
 * react 设置对象默认值的类型
 * */
// 定义类型必须不包含 undefined
type Defined<T> = T extends undefined ? never : T;
{
  type a = Defined<undefined>; // never
  type b = Defined<undefined | number>; // number
}

// 如果 P 中的可选 在DP 中有则变成 required
type WithDefaultProps<P, DP extends Partial<P>> = Omit<P, keyof DP> &
  {
    [K in Extract<keyof DP, keyof P>]: DP[K] extends Defined<P[K]>
      ? Defined<P[K]>
      : Defined<P[K]> | DP[K];
  };
{
  type a = Defined<undefined | number> | 1; // number
  type b = WithDefaultProps<{ a: 1; b?: number }, { b: 2 }>;
  function test(t: b) {
    t.b; // number
    t.a; // 1
  }
}

/**
 * {} 和 所有属性都是可选的对象 可兼容
 * */
{
  type a = {} extends undefined ? true : false; // false
  type b = {} extends null ? true : false; // false
  type c = {} extends { a: 1 } ? true : false; // false
  type d = {} extends { a?: 1 } ? true : false; // true
}
/**
 * 获取 所有必选项 的 key 的联合类型
 * */
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
/**
 * 获取 所有非必选项 的 key 的联合类型
 * */
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
{
  type a = RequiredKeys<{ a?: 1; b: 2 }>; // "b"
  type b = OptionalKeys<{ a?: 1; b: 2 }>; // "a"
}

/**
 * 判断两个类型是不是 相互兼容
 * Returns true if X and Y are equal types, otherwise false
 * @author Matt McCutchen
 */
type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;
{
  type a = Equals<{}, {}>; // true
  type b = Equals<{}, { a: 1 }>; // false
  type c = Equals<number, 1>; // false
  type d = Equals<RequiredKeys<any>, OptionalKeys<any>>; // false
}

/**
 * From 4.1
 * */
{
  // type Uppercase<S extends string> = intrinsic;
  // type Lowercase<S extends string> = intrinsic;
  // type Capitalize<S extends string> = intrinsic;
  // type Uncapitalize<S extends string> = intrinsic;

  type T10 = Uppercase<"hello">; // 转小写 "HELLO"
  type T11 = Lowercase<"HELLO">; // 转大写 "hello"
  type T12 = Capitalize<"hello">; // 转首字母大写 "Hello"
  type T13 = Uncapitalize<"Hello">; // 转首字母小写 "hello"

  type T20 = Uppercase<"foo" | "bar">; // "FOO" | "BAR"
  type T21 = Lowercase<"FOO" | "BAR">; // "foo" | "bar"
  type T22 = Capitalize<"foo" | "bar">; // "Foo" | "Bar"
  type T23 = Uncapitalize<"Foo" | "Bar">; // "foo" | "bar"

  type T30<S extends string> = Uppercase<`aB${S}`>;
  type T31 = T30<"xYz">; // "ABXYZ"
  type T32<S extends string> = Lowercase<`aB${S}`>;
  type T33 = T32<"xYz">; // "abxyz"
  type T34 = `${Uppercase<"abc">}${Lowercase<"XYZ">}`; // "ABCxyz"

  type T40 = Uppercase<string>; // string
  type T41 = Uppercase<any>; // any
  type T42 = Uppercase<never>; // never
  // type T43 = Uppercase<42>;  // Error, type 'number' does not satisfy the constraint 'string'
}

/**
 * 联合类型 转 元组
 * 太牛逼了
 * */
{
  type UnionToTuple<T> = (
    (T extends any ? (t: T) => T : never) extends infer U
      ? (U extends any ? (u: U) => any : never) extends (v: infer V) => any
        ? V
        : never
      : never
  ) extends (_: any) => infer W
    ? [...UnionToTuple<Exclude<T, W>>, W]
    : [];

  class BHAAL {
    private isBhaal = true;
  }

  type Tuple = UnionToTuple<
    | 2
    | 1
    | 3
    | 5
    | 10
    | -9
    | 100
    | 1001
    | 102
    | 123456
    | 100000000
    | "alice"
    | [[[BHAAL]]]
    | "charlie"
  >;
  //     ^? = [2, 1, 3, 5, 10, -9, 100, 1001, 102, 123456, 100000000, "alice", [[[BHAAL]]], "charlie"]
}
/**
 * 元组类型 转联合 类型
 * */
{
  type TupleToUnion<T extends any[]> = T extends (infer A)[] ? A : never;
  class BHAAL {
    private isBhaal = true;
  }
  type T1 = TupleToUnion<
    [
      2,
      1,
      3,
      5,
      10,
      -9,
      100,
      1001,
      102,
      123456,
      100000000,
      "alice",
      [[[BHAAL]]],
      "charlie"
    ]
  >;
}


export {};
