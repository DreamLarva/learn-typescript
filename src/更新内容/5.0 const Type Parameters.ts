/*
泛型中 添加 const 推断更准确的类型
语法一般为  <const T extends readonly SOME_TYPE>
同样，请记住修饰符const仅影响在调用中编写的对象、数组和原始表达式的字面量推断，因此不会（或不能）被 as const 修饰的 不会有任何行为变化

这个语法相当于 让字面量的参数 可以少写个 as const
 */
{
  type HasNames = { readonly names: readonly string[] };

  function getNamesExactly<T extends HasNames>(arg: T): T["names"] {
    return arg.names;
  }

  // Inferred type: string[]
  const names1 = getNamesExactly({ names: ["Alice", "Bob", "Eve"] });

  // Correctly gets what we wanted:
  // readonly ["Alice", "Bob", "Eve"]
  const names2 = getNamesExactly({ names: ["Alice", "Bob", "Eve"] } as const);
}

{
  type HasNames = { names: readonly string[] };
  function getNamesExactly<const T extends HasNames>(arg: T): T["names"] {
    //                     ^^^^^
    return arg.names;
  }

  // Inferred type: readonly ["Alice", "Bob", "Eve"]
  // Note: Didn't need to write 'as const' here
  const names = getNamesExactly({ names: ["Alice", "Bob", "Eve"] });
}

// const 对于可变类型 是无效的
declare function fnBad<const T extends string[]>(args: T): void;

// 'T' is still 'string[]' since 'readonly ["a", "b", "c"]' is not assignable to 'string[]'
fnBad(["a", "b", "c"]);

// 除了字面量外,
// 字面量 ok
declare function fnGood2<const T extends readonly string[]>(args: T): void;
// T is readonly ["a", "b", "c"]
fnGood2(["a", "b", "c"]);

declare function fnGood3<const T extends readonly string[]>(args: T): void;
const arr1 = ["a", "b", "c"];
// 'T' is still 'string[]'-- the 'const' modifier has no effect here
fnGood3(arr1);

const arr2: readonly string[] = ["a", "b", "c"];
// 无效
fnGood3(arr2);

const arr3 = ["a", "b", "c"] as const;
// ok
fnGood3(arr3);
