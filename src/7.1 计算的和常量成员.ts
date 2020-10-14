{
  // E.X is constant:
  enum E {
    X,
  }

  // All enum members in 'E1' and 'E2' are constant.
  enum E1 {
    X,
    Y,
    Z,
  }

  enum E2 {
    A = 1,
    B,
    C,
  }
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
  enum FileAccess {
    // constant members
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // computed member
    G = "123".length,
  }

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
