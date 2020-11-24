/**
 * Just as a refresher, a mapped type can create new object types based on arbitrary keys
 * 之前 映射类型 可以通过任意key 的类型 来生成 新的 对象类型
 * or new object types based on other object types.
 * 或者 根据其他 对象类型
 * */
{
  type Options = {
    [K in
      | "noImplicitAny"
      | "strictNullChecks"
      | "strictFunctionTypes"]?: boolean;
  };
  // same as
  //   type Options = {
  //       noImplicitAny?: boolean,
  //       strictNullChecks?: boolean,
  //       strictFunctionTypes?: boolean
  //   };

  /// 'Partial<T>' is the same as 'T', but with each property marked optional.
  type Partial<T> = {
    [K in keyof T]?: T[K];
  };
}
/**
 * Until now, mapped types could only produce new object types with keys that you provided them;
 * 现在 映射类型 可以通过 你提供的keys 生成新的对象类型
 * however, lots of the time you want to be able to create new keys, or filter out keys, based on the inputs.
 * 然而 很多时候 你希望 根据原有的 生成新的key , 或者 过滤 原有的key
 * */
/**
 * 现在可以使用 as 关键字,用 template literal types 加工原来的key 来生成新的 key
 * */
{
  type Getters<T> = {
    [K in keyof T as `gets${Capitalize<string & K>}`]: () => T[K];
  };

  interface Person {
    name: string;
    age: number;
    location: string;
  }

  type LazyPerson = Getters<Person>;
}
/**
 * 也可通过返回 never 类型 来移除特定的 属性(key + value )
 * */
{
  // 移除 kind 属性
  type RemoveKindField<T> = {
    [K in keyof T as Exclude<K, "kind">]: T[K];
  };

  interface Circle {
    kind: "circle";
    radius: number;
  }

  type KindlessCircule = RemoveKindField<Circle>;
  // same as
  //   type KindlessCircle = {
  //       radius: number;
  //   };
}

/**
 * 详细设计
 * */
/**
 * 语法
 * { [P in K as N]: X }
 *
 * N 的类型必须是可分配给 string | number | symbol 类型的类型
 * N 就是 根据P 转换如 用 template literal type 转换后的类型
 * */
{
  //                                这里就只处理 string 类型了
  type Getters<T> = {
    [P in keyof T & string as `get${Capitalize<P>}`]: () => T[P];
  };
  type T50 = Getters<{ foo: string; bar: number }>; // { getFoo: () => string, getBar: () => number }
}
/**
 * keyof T & string 是 必要的 因为 keyof T 可能包含 symbol 类型(不能用 template literal types 类型转换)
 * */
{
  type Methods<T> = {
    [P in keyof T as T[P] extends Function ? P : never]: T[P];
  }; // 只留下 Function 的属性
  type T60 = Methods<{ foo(): number; bar: boolean }>; // { foo(): number }
}
/**
 * 当 as 之后是 联合类型字面量 时
 * 同样是遵循 笛卡尔积的操作
 * */
{
  type DoubleProp<T> = { [P in keyof T & string as `${P}1` | `${P}2`]: T[P] };
  type T70 = DoubleProp<{ a: string; b: number }>;
  // { a1: string, a2: string, b1: number, b2: number }
}

export {};
