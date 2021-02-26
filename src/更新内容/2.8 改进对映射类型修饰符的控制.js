"use strict";
/**
 * 映射类型支持在属性上添加readonly或?修饰符，但是它们不支持移除修饰符。
 * 这对于同态映射类型有些影响，因为同态映射类型默认保留底层类型的修饰符。
 *
 * TypeScript 2.8为映射类型增加了增加或移除特定修饰符的能力。
 * 特别地，映射类型里的readonly或?属性修饰符现在可以使用+或-前缀，来表示修饰符是添加还是移除。
 * */
{
}
/**
 * 不带+或-前缀的修饰符与带+前缀的修饰符具有相同的作用。因此上面的ReadonlyPartial<T>类型与下面的一致
 * */
{
}
{
}
//# sourceMappingURL=2.8%20%E6%94%B9%E8%BF%9B%E5%AF%B9%E6%98%A0%E5%B0%84%E7%B1%BB%E5%9E%8B%E4%BF%AE%E9%A5%B0%E7%AC%A6%E7%9A%84%E6%8E%A7%E5%88%B6.js.map