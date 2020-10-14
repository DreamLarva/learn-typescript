/**
 * 泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。
 * */
{
  class GenericNumber<T> {
    zeroValue!: T;
    add!: (x: T, y: T) => T;
  }

  let myGenericNumber = new GenericNumber<number>();
  /**
   * 设置了 number 类型后
   * zeroValue属性 和 add 的 参数 x y 都是 number 类型
   * */
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function (x, y) {
    return x + y;
  };

  let stringNumeric = new GenericNumber<string>();
  stringNumeric.zeroValue = "";
  stringNumeric.add = function (x, y) {
    return x + y;
  };

  console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
}

export {};
