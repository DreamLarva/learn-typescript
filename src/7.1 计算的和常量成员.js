{
  // E.X is constant:
  let E;
  (function (E) {
    E[(E["X"] = 0)] = "X";
  })(E || (E = {}));
  // All enum members in 'E1' and 'E2' are constant.
  let E1;
  (function (E1) {
    E1[(E1["X"] = 0)] = "X";
    E1[(E1["Y"] = 1)] = "Y";
    E1[(E1["Z"] = 2)] = "Z";
  })(E1 || (E1 = {}));
  let E2;
  (function (E2) {
    E2[(E2["A"] = 1)] = "A";
    E2[(E2["B"] = 2)] = "B";
    E2[(E2["C"] = 3)] = "C";
  })(E2 || (E2 = {}));
}
{
  /**
   * 枚举成员使用 常量枚举表达式 初始化.
   * 常数枚举表达式是 TypeScript表达式的子集,他可以在编译阶段求值
   * 当一个表达式满足下面条件之一时,他就使用一个常量枚举表达式
   * 1. 一个枚举表达式字面量(主要是字符串字面量或数字字面量)
   * 2. 一个对之前定义的常量枚举成员的引用(可以是不同的枚举类型中定义的)
   * 3/ 带括号的常量枚举表达式
   * 4.常量表达式作为二元运算符 +, -, *, /, %, <<, >>, >>>, &, |, ^ 的操作对象
   * 如果常熟枚举表达式 求职后为NaN 或 Infinity,则会在编译截断报错.
   * */
  let FileAccess;
  (function (FileAccess) {
    // constant members
    FileAccess[(FileAccess["None"] = 0)] = "None";
    FileAccess[(FileAccess["Read"] = 2)] = "Read";
    FileAccess[(FileAccess["Write"] = 4)] = "Write";
    FileAccess[(FileAccess["ReadWrite"] = 6)] = "ReadWrite";
    // computed member
    FileAccess[(FileAccess["G"] = "123".length)] = "G";
  })(FileAccess || (FileAccess = {}));
  /*{ '0': 'None',
        '2': 'Read',
        '3': 'G',
        '4': 'Write',
        '6': 'ReadWrite',
        None: 0,
        Read: 2,
        Write: 4,
        ReadWrite: 6,
        G: 3 }*/
}
export {};
//# sourceMappingURL=7.1 计算的和常量成员.js.map
