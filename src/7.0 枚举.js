/**
 * 使用ts的枚举不可以使用 Symbol类型
 * */
{
  /**
   * 数字枚举
   * 是一个在运行后会存在的变量
   * */
  let test1;
  (function (test1) {
    test1[(test1["Up"] = 0)] = "Up";
    test1[(test1["Down"] = 1)] = "Down";
    test1[(test1["Left"] = 2)] = "Left";
    test1[(test1["Right"] = 3)] = "Right";
  })(test1 || (test1 = {}));
  /*{ '0': 'Up',
        '1': 'Down',
        '2': 'Left',
        '3': 'Right',
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3 }*/
  /**
   * 自增
   * 如果被赋值为数字 那么之后的赋值就会自增
   * */
  let test2;
  (function (test2) {
    test2[(test2["Up"] = 9)] = "Up";
    test2[(test2["Down"] = 10)] = "Down";
    test2[(test2["Left"] = 11)] = "Left";
    test2[(test2["Right"] = 12)] = "Right";
  })(test2 || (test2 = {}));
  /* { '9': 'Up',
         '10': 'Down',
         '11': 'Left',
         '12': 'Right',
         Up: 9,
         Down: 10,
         Left: 11,
         Right: 12 }*/
  /**
   * 如果给非 第一个内容赋值为 一个数字赋值为数字
   * 那么第一个依然从0 开始自增
   * 可能会与后面赋值为 数字的 可能出现 相同的值
   * */
  let test3;
  (function (test3) {
    test3[(test3["Up"] = 0)] = "Up";
    test3[(test3["Down"] = 1)] = "Down";
    test3[(test3["Left"] = 1)] = "Left";
    test3[(test3["Right"] = 2)] = "Right";
  })(test3 || (test3 = {}));
  /*{ '0': 'Up',
        '1': 'Left',
        '2': 'Right',
        Up: 0,
        Down: 1,
        Left: 1,
        Right: 2 }*/
}
{
  /** 字符串枚举 */
  let Direction;
  (function (Direction) {
    Direction["Up"] = "UP";
    Direction["Down"] = "DOWN";
    Direction["Left"] = "LEFT";
    Direction["Right"] = "RIGHT";
  })(Direction || (Direction = {}));
}
export {};
//# sourceMappingURL=7.0 枚举.js.map
