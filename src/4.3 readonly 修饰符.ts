{
  /**
   * 你可以使用 readonly关键字将属性设置为只读的。
   * 只读属性必须在声明时或构造函数里被初始化(有默认值的话 编译时会自动初始化)。
   * 当然可以和其他修饰符 连用
   * */
  class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    // protected readonly b: string; // 必须有默认值
    private readonly c: number = 8;

    constructor(theName: string) {
      this.name = theName;
    }
  }

  let dad = new Octopus("Man with the 8 legs");
  // dad.name = "Man with 3-piece suit" // Error
}
{
  /**
   * 参数属性
   * 由于 readonly 的属性必须 初始化
   * ts 也提供了 直接 才 constructor 中同时初始化 和声明的办法
   * */
  class Octopus {
    // 同上一个实例
    constructor(readonly numberOfLegs: number = 8) {}
  }

  const ins = new Octopus();
  console.log(ins);
}

export {}
