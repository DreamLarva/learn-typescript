{
  class Greeter {
    greeting: string;

    constructor(message: string) {
      this.greeting = message;
    }

    greet() {
      return "Hello, " + this.greeting;
    }
  }

  let greeter: Greeter;
  greeter = new Greeter("world");
  console.log(greeter.greet());
}

{
  class Greeter {
    static standardGreeting = "Hello, there";

    constructor(public greeting?: string) {}

    greet() {
      if (this.greeting) {
        return "Hello, " + this.greeting;
      } else {
        return Greeter.standardGreeting;
      }
    }
  }

  let greeter1: Greeter;
  greeter1 = new Greeter();
  console.log(greeter1.greet());

  /**
   * 如果类型 类 作为类型 一定指代的 实例的类型
   * 如果想要使用 类本身 就要是用typeof 关键字
   * */
  /**
   * 相当于将Greeter类赋值给一个 变量
   * 在变量上面可以修改静态属性
   * */
  let greeterMaker: typeof Greeter = Greeter; // typeof Greeter，意思是取Greeter类的类型
  let greeterMaker2 = Greeter; // 现在已经可以 自动推断了

  greeterMaker.standardGreeting = "Hey there!";
  console.log("standardGreeting", greeterMaker.standardGreeting);
  console.log("standardGreeting", Greeter.standardGreeting);

  let greeter2: Greeter = new greeterMaker();
  console.log(greeter2.greet());
}

export {};
