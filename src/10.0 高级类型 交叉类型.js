/**
 * 交叉类型（Intersection Types）
 * 交叉类型是将多个类型合并为一个类型。
 * 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
 * 使用场景:
 * 我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。
 * */
{
  /**
   * 浅克隆两个对象 为一个新对象
   * */
  function extend(first, second) {
    let result = {};
    for (let id in first) {
      result[id] = first[id];
    }
    for (let id in second) {
      /**
       * 版本 3.5 以后无约束的泛型 默认为 unknown(unknown 不能 访问 成员)
       * 解决 :
       *  1. 这里也要加上 <any>
       *  2. T extends {} U extends {} 这样就保证  泛型 必须传入一个 对象才行
       * */
      if (!result.hasOwnProperty(id)) {
        result[id] = second[id];
      }
    }
    return result;
  }
  class Person {
    constructor(name) {
      this.name = name;
    }
  }
  class ConsoleLogger {
    constructor(a) {
      this.a = a;
      this.a = "some text";
    }
    log() {
      console.log("some text");
    }
  }
  const jim = extend(new Person("Jim"), new ConsoleLogger("a"));
  console.log(jim.name);
  console.log(jim.a);
  // jim.log(); // 编译不报错 运行时报错 因为log 是class上prototype的方法
}
export {};
//# sourceMappingURL=10.0 高级类型 交叉类型.js.map
