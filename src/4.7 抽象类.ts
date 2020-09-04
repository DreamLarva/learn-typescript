{
  /**
   * 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。
   * abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
   * */
  abstract class Animal {
    _a: number = 5;

    protected constructor(public _b: number) {}

    get A(): number {
      return this._a;
    }

    // get B():number; // 不能定义存取器的 类型
    // 也不能 定义 存取器的实现
    // abstract get B(){ return this._a} // Error

    abstract makeSound(): void;

    move(): void {
      console.log("roaming the earch...");
    }
  }
}

/**
 * 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。
 * 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。
 * 可以有额外的 成员
 * */
abstract class Department {
  protected constructor(public name: string) {
    // protected constructor 该类只能继承 自己不能创建实例
  }

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  B = 1;

  constructor() {
    super("Accounting and Auditing"); // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
    //
    super.printName();
    console.log("The Accounting Department meets each Monday at 10am.");
  }

  generateReports(): void {
    console.log("Generating accounting reports...");
  }

  A() {}
}

class A extends AccountingDepartment {
  constructor() {
    super();
  }

  generateReports(): void {
    super.name;
    super.generateReports();
    super.printMeeting();
    super.printName();
    console.log("Generating accounting reports...");
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在

let a = new A();
a.generateReports();

class A1 {}

abstract class B extends A1 {} // 抽象类可以继承 普通类
interface IB extends B {} // 接口 可以继承 抽象类
abstract class C extends B {} // 抽象类可以 继承抽象类
abstract class D extends A1 implements IB {
} // 抽象类可以 实现接口


export {};
