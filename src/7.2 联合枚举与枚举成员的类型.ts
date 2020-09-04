{
  /** 枚举成员为类型 */
  enum ShapeKind {
    Circle,
    Square,
  }

  interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
  }

  interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
  }

  let c: Circle = {
    kind: ShapeKind.Circle,
    radius: 100,
  };
  console.log(ShapeKind); // { '0': 'Circle', '1': 'Square', Circle: 0, Square: 1 }
}
{
  enum E {
    Foo,
    Bar,
  }

  /**
   * 因为枚举内声明的时候就没有可能产生相容的属性值能
   * 那么在比对的时候就不需要多余的比较
   * */
  function f(x: E) {
    /**
     * x 已经声明为E枚举类型。
     * ||会发生短路效果， if语句体里的内容会被执行。
     * 然而，这个检查没有通过，那么 x则 只能为 E.Foo，因此没理由再去检查它是否为 E.Bar。
     * */
    // if (x !== E.Foo || x !== E.Bar) {
    //     //             ~~~~~~~~~~~
    //     // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
    // }
  }
}
export {}
