function identity(arg) {
  return arg;
}
/** 泛型类型 */
let myIdentity1 = identity;
/** 我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。 */
let myIdentity2 = identity;
/** 使用带有调用签名的对象字面量来定义泛型函数 */
let myIdentity3 = identity;
{
  let myIdentity = identity;
}
{
  /**
   * 将泛型定为<number>类型
   * */
  let myIdentity = identity;
  myIdentity(1);
  let myIdentity1 = identity;
  myIdentity1(1);
  /** 使用类型推断 泛型中的类型推断为参数的类型为number */
  let myIdentity2 = identity;
  myIdentity2(1);
}
export {};
//# sourceMappingURL=6.2 泛型类型.js.map
