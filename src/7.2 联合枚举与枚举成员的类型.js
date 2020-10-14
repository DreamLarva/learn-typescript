{
  /** 枚举成员为类型 */
  let ShapeKind;
  (function (ShapeKind) {
    ShapeKind[(ShapeKind["Circle"] = 0)] = "Circle";
    ShapeKind[(ShapeKind["Square"] = 1)] = "Square";
  })(ShapeKind || (ShapeKind = {}));
  let c = {
    kind: ShapeKind.Circle,
    radius: 100,
  };
  console.log(ShapeKind); // { '0': 'Circle', '1': 'Square', Circle: 0, Square: 1 }
}
{
  let E;
  (function (E) {
    E[(E["Foo"] = 0)] = "Foo";
    E[(E["Bar"] = 1)] = "Bar";
  })(E || (E = {}));
  /**
   * 因为枚举内声明的时候就没有可能产生相容的属性值能
   * 那么在比对的时候就不需要多余的比较
   * */
  function f(x) {
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
export {};
//# sourceMappingURL=7.2 联合枚举与枚举成员的类型.js.map
