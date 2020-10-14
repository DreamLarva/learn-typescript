{
  /**
   * 继承基础
   * 类从基类中继承了属性和方法
   * Dog是一个 派生类，它派生自 Animal 基类
   * 派生类通常被称作 子类，基类通常被称作 超类
   * */
  class Animal {
    move(distanceInMeters = 0) {
      console.log(`Animal moved ${distanceInMeters}m.`);
    }
  }
  class Dog extends Animal {
    bark() {
      console.log("Woof! Woof!");
    }
  }
  const dog = new Dog();
  dog.bark();
  dog.move(10);
  dog.bark();
}
{
  class Animal {
    constructor(theName) {
      this.name = theName;
    }
    move(distanceInMeters = 0) {
      console.log(`${this.name} move ${distanceInMeters}m.`);
    }
  }
  class Snake extends Animal {
    constructor(name) {
      // 访问 this 之前必须先调用 this
      super(name);
    }
    move(distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters);
    }
  }
  class Horse extends Animal {
    constructor(name) {
      super(name);
    }
    move(distanceInMeters = 45) {
      console.log("Galloping...");
      super.move(distanceInMeters);
    }
    eat() {}
  }
  let sam = new Snake("Sammy the Python");
  let tom = new Horse("Tommy the Palomino");
  /** ts 认为tom能用的是Animal中的方法 而不是其子类 Horse 中素有的方法*/
  tom.move(23);
  // tom.eat() // 报错
}
export {};
//# sourceMappingURL=4.1 继承.js.map
