// 取出元组 首个是 string 的类型

// 1. ts 4.7 前
{
  type FirstIfString<T> = T extends [infer S, ...unknown[]]
    ? S extends string
      ? S
      : never
    : never;

  // string
  type A = FirstIfString<[string, number, number]>;

  // "hello"
  type B = FirstIfString<["hello", number, number]>;

  // "hello" | "world"
  type C = FirstIfString<["hello" | "world", boolean]>;

  // never
  type D = FirstIfString<[boolean, number, string]>;
}

// 2. ts 4.7 前 使用 T[0] 如果类型本身够复杂 会很不方便
{
  type FirstIfString<T> =
    T extends [string, ...unknown[]]
      // Grab the first type out of `T`
      ? T[0]
      : never;
}

// ts 4.7 可以在 infer 之后 extends 来约束
{
  type FirstIfString<T> =
    T extends [infer S extends string, ...unknown[]]
      ? S
      : never;
}
