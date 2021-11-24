/**
 * 当可选类型中出现递归时, ts 会判断是不是 无限递归 ,而报错
 * */

{
  type InfiniteBox<T> = { item: InfiniteBox<T> };

  type Unpack<T> = T extends { item: infer U } ? Unpack<U> : T;

  // error: Type instantiation is excessively deep and possibly infinite.
  // type Test = Unpack<InfiniteBox<number>>

  type Test2 = Unpack<{ item: { item: { item: { item: number } } } }>; // 有限的递归 ok
}
{
  type TrimLeft<T extends string> = T extends ` ${infer Rest}`
    ? TrimLeft<Rest>
    : T;

  // Test = "hello" | "world"
  type Test1 = TrimLeft<"   hello" | " world">;

  // 报错 递归超过50次
  // error: Type instantiation is excessively deep and possibly infinite.
  // type Test = TrimLeft<"
}

{
  // 这个类型不能被 尾类型递归 优化
  // 因为 最后是一个类型
  type GetChars<S> = S extends `${infer Char}${infer Rest}`
    ? Char | GetChars<Rest>
    : never;

  type Test1 = GetChars<"1234567890">;
  // error 超过50个
  // type Test2 = GetChars<"123456789012345678901234567890123456789012345678901234567890">;
}

{
  // 为了被 尾递归优化, 就需要写一个帮助函数
  // 递归时没有其他额外的内容`
  type GetChars<S> = GetCharsHelper<S, never>;
  type GetCharsHelper<S, Acc> = S extends `${infer Char}${infer Rest}`
    ? GetCharsHelper<Rest, Char | Acc>
    : Acc;

  type Test1 = GetChars<"01234657890">;
  // 依然ok
  type Test2 =
    GetChars<"1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890">;
  // 也是ok
  type Test3 =
    GetChars<"当 TypeScript 检测到可能的无限递归或任何可能需要很长时间并影响您的编辑器体验的类型扩展时，它通常需要优雅地失败。因此，TypeScript 具有启发式方法，可确保在尝试分离无限深的类型或处理会生成大量中间结果的类型时不会脱轨。这就是 TypeScript 4.5 对条件类型执行一些尾递归消除的原因。只要条件类型的一个分支只是另一种条件类型，TypeScript 就可以避免中间实例化。仍然有一些启发式方法可以确保这些类型不会偏离轨道，但它们要大得多。">;
}

export {};
