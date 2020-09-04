/**
 * TypeScript 4.0 can now use control flow analysis to determine the types of properties in classes when **noImplicitAny** is enabled.
 * */
{
  class Square {
    // Previously both of these were any
    area;
    // ^ = (property) Square.area: number
    sideLength;

    // ^ = (property) Square.sideLength: number
    constructor(sideLength: number) {
      this.sideLength = sideLength;
      this.area = sideLength ** 2;
    }
  }
}
/**
 * In cases where not all paths of a constructor assign to an instance member, the property is considered to potentially be undefined.
 * 如果不是所有分支 都有设置值 自然会判断为 可能是 undefined
 * */
{
  class Square {
    sideLength;

    // ^ = (property) Square.sideLength: number | undefined

    constructor(sideLength: number) {
      if (Math.random()) {
        this.sideLength = sideLength;
      }
    }

    // get area() {
    //   return this.sideLength ** 2; // Object is possibly 'undefined'.
    // }
  }
}
/**
 * In cases where you know better (e.g. you have an initialize method of some sort),
 * you’ll still need an explicit type annotation along with a definite assignment assertion (!) if you’re in **strictPropertyInitialization**.
 * 有 strictPropertyInitialization 配置的时候 使用 !断言 确保属性的类型,由写代码的人保证
 * */
{
  class Square {
    // definite assignment assertion
    //        v
    sideLength!: number;
    //         ^^^^^^^^
    // type annotation

    constructor(sideLength: number) {
      this.initialize(sideLength);
    }

    initialize(sideLength: number) {
      this.sideLength = sideLength;
    }

    get area() {
      return this.sideLength ** 2;
    }
  }
}
