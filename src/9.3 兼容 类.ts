/**
 * 类与对象字面量和接口差不多，但有一点不同：类有静态部分和实例部分的类型。
 * 比较两个类类型的对象时，只有实例的成员会被比较。
 * 静态成员和构造函数不在比较的范围内。
 * */
{
  class Animal {
    static b: string = " some text"; // 不参与类型比较
    feet!: number;

    constructor(name: string, numFeet: number) {}
  }

  class Size {
    static a: number = 1; // 不参与类型比较
    feet!: number;

    constructor(numFeet: number) {}
  }

  let a: Animal = new Animal("name", 123);
  let s: Size = new Size(123);

  // 如果都不实例化 就不能这样 兼容赋值
  a = s; //OK
  s = a; //OK
}
/**
 * 对于可选属性
 * */
{
  class Animal {
    static b: string = " some text"; // 不参与类型比较
    feet!: number;

    constructor(name: string, numFeet: number) {}
  }

  class Size {
    static a: number = 1; // 不参与类型比较
    feet?: number;

    constructor(numFeet: number) {}
  }

  let a: Animal = new Animal("name", 123);
  let s: Size = new Size(123);

  // s.feet 兼容 a.feet 反之 不行 因为(s.feet: void | number)
  // a = s;  // error
  s = a; // OK
}
{
  /**
   * public 方法 可以兼容
   * */
  class Animal {
    feet!: number;

    constructor(name: string, numFeet: number) {}

    public a() {}
  }

  class Size {
    feet!: number;

    constructor(numFeet: number) {}

    public a() {}
  }

  let a: Animal = new Animal("name", 123);
  let s: Size = new Size(123);

  // 如果都不实例化 就不能这样 兼容赋值
  a = s; //OK
  s = a; //OK
}
{
  /**
   * 无继承关系 private 方法 只要有就绝对不能兼容
   * 私有成员会影响兼容性判断。 当类的实例用来检查兼容时，如果目标类型包含一个私有成员，那么源类型必须包含来自同一个类的这个私有成员。
   * 这允许子类赋值给父类，但是不能赋值给其它有同样类型的类。
   * */
  class Animal {
    feet!: number;
    private b!: number;

    constructor(name: string, numFeet: number) {}

    private a() {}
  }

  class Size {
    feet!: number;
    private b!: number;

    constructor(numFeet: number) {}

    private a() {}
  }

  let a: Animal;
  let s: Size;

  // a = s;  // Error
  // s = a;  // Error
}

{
  /**
   * 无继承关系 protected 方法 只要有就绝对不能兼容
   * */
  class Animal {
    feet!: number;

    constructor(name: string, numFeet: number) {}

    protected a() {}
  }

  class Size {
    feet!: number;

    constructor(numFeet: number) {}

    protected a() {}
  }

  let a: Animal;
  let s: Size;

  // a = s;  // Error
  // s = a;  // Error
}

{
  /**
   * 继承
   * */
  class Animal {
    feet!: number;

    constructor(name: string, numFeet: number) {}

    protected a() {}

    private b() {}
  }

  class BlackPanther extends Animal {
    // override 必须有默认值, 或者有初始化
    // override feet!: number;
    override feet: number;

    constructor(name: string, numFeet: number, other: any) {
      super(name, numFeet);

      this.feet = 1;
    }

     protected override a() {}
  }

  let a: Animal = new Animal("name", 123);
  let s: BlackPanther = new BlackPanther("name", 123, true);

  a = s; // 父类可以兼容子类
  // s = a;  // 子类不能兼容父类
}

export {};
