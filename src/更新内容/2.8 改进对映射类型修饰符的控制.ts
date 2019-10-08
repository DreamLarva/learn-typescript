/**
 * 映射类型支持在属性上添加readonly或?修饰符，但是它们不支持移除修饰符。
 * 这对于同态映射类型有些影响，因为同态映射类型默认保留底层类型的修饰符。
 *
 * TypeScript 2.8为映射类型增加了增加或移除特定修饰符的能力。
 * 特别地，映射类型里的readonly或?属性修饰符现在可以使用+或-前缀，来表示修饰符是添加还是移除。
 * */
{
    type MutableRequired<T> = { -readonly [P in keyof T]-?: T[P] };  // 移除readonly和?
    type ReadonlyPartial<T> = { +readonly [P in keyof T]+?: T[P] };  // 添加readonly和?
}
/**
 * 不带+或-前缀的修饰符与带+前缀的修饰符具有相同的作用。因此上面的ReadonlyPartial<T>类型与下面的一致
 * */
{
    type ReadonlyPartial<T> = { readonly [P in keyof T]?: T[P] };  // 添加readonly和?
}
{
    type Required<T> = { [P in keyof T]-?: T[P] };
    type Foo = { a?: string };  // 等同于 { a?: string | undefined }
    type Bar = Required<Foo>;  // 等同于 { a: string }
}
