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
type ConstructorParameters<
  T extends new (...args: any) => any
> = T extends new (...args: infer P) => any ? P : never;

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
 * */
// 定义类型必须不包含 undefined
type Defined<T> = T extends undefined ? never : T;

// 对象默认值
type WithDefaultProps<P, DP extends Partial<P>> = Omit<P, keyof DP> &
  {
    [K in Extract<keyof DP, keyof P>]: DP[K] extends Defined<P[K]>
      ? Defined<P[K]>
      : Defined<P[K]> | DP[K];
  };

export {};
