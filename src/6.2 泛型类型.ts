function identity<T>(arg: T): T {
  return arg;
}

/** 泛型类型 */
let myIdentity1: <T>(arg: T) => T = identity;

/** 我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。 */
let myIdentity2: <U>(arg: U) => U = identity;

/** 使用带有调用签名的对象字面量来定义泛型函数 */
let myIdentity3: { <T>(arg: T): T } = identity;

{
  /**
   * 使用泛型接口
   * 注意泛型的尖括号在前(type关键字 后的泛型也是在小括号前)
   * */
  // 泛型方法接口
  interface GenericIdentityFn {
    <T>(arg: T): T;
  }

  let myIdentity: GenericIdentityFn = identity;
}
{
  /**
   * 不再描述泛型函数，而是把非泛型函数签名作为泛型类型一部分
   * 当我们使用 GenericIdentityFn的时候，还得传入一个类型参数来指定泛型类型
   * */
  interface GenericIdentityFn<T> {
    (arg: T): T;
  }

  /**
   * 将泛型定为<number>类型
   * */
  let myIdentity: GenericIdentityFn<number> = identity;
  myIdentity(1);

  let myIdentity1 = identity;
  myIdentity1<number>(1);

  /** 使用类型推断 泛型中的类型推断为参数的类型为number */
  let myIdentity2 = identity;
  myIdentity2(1);
}

export {};
