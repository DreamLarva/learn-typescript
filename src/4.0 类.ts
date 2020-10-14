{
  class Greeter {
    greeting: string;

    // 这没写就必须初始化
    constructor(message: string) {
      this.greeting = message;
    }

    greet() {
      return "Hello, " + this.greeting;
    }
  }

  let greeter = new Greeter("world");
}
/**
 * 如何 new 的时候不初始化属性
 * 由使用者保证实例化 后手动赋值 再调用方法
 * */
{
  class Greeter {
    name!: string;

    greet() {
      console.log(this.name);
    }
  }

  const instance = new Greeter();
  // instance.greet() // 不报错
  instance.name = "some string";
  instance.greet(); // 由使用这保证
}

export {};
