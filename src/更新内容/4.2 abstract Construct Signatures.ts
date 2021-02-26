{
  abstract class Shape {
    abstract getArea(): number;
  }

  // 抽象类不能实例化
  // Error! Can't instantiate an abstract class.
  //   new Shape();

  class Square extends Shape {
    #sideLength: number;

    constructor(sideLength: number) {
      super();
      this.#sideLength = sideLength;
    }

    getArea() {
      return this.#sideLength ** 2;
    }
  }

  // Works fine.
  new Square(42);

  interface HasArea {
    getArea(): number;
  }

  // 不能将抽象类 分配给 构造函数类型
  // Error! Cannot assign an abstract constructor type to a non-abstract constructor type.
  // let Ctor: new () => HasArea = Shape;

  // 但是如果我们想编写Ctor的子类，则该限制过于严格。
  function makeSubclassWithArea(Ctor: new () => HasArea) {
    return class extends Ctor {
      getArea() {
        return 1;
      }
    };
  }

  // Error!
  // Type 'typeof Shape' does not satisfy the constraint 'new (...args: any) => any'.
  //   Cannot assign an abstract constructor type to a non-abstract constructor type.
  // type MyInstance = InstanceType<typeof Shape>;



  let Ctor: abstract new () => HasArea = Shape;
}

{
  abstract class SuperClass {
    abstract someMethod(): void;
    badda() {}
  }

  type AbstractConstructor<T> = abstract new (...args: any[]) => T

  function withStyles<T extends AbstractConstructor<object>>(Ctor: T) {
    abstract class StyledClass extends Ctor {
      getStyles() {
        // ...
      }
    }
    return StyledClass;
  }

  class SubClass extends withStyles(SuperClass) {
    someMethod() {
      this.someMethod()
    }
  }
}

export {};
