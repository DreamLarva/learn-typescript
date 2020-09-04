/**
 * TypeScript 2.0实现了标记（或区分）联合类型。具体而言，
 * TS编译器现在支持类型保护，基于判别属性的检查来缩小联合类型的范围，并且switch语句也支持此特性。
 * 必须是 联合类型的 每个 都有数属性 可以类型不同 但是必须是字面量
 * */
{
  interface Square {
    kind: "square";
    size: number;
  }

  interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
  }

  interface Circle {
    kind: "circle";
    radius: number;
  }

  interface A {
    kind: 1;
    a: number;
  }

  type Shape = Square | Rectangle | Circle | A;

  function area(s: Shape) {
    // 在下面的switch语句中，s的类型在每一个case中都被缩小
    // 根据判别属性的值，变量的其它属性不使用类型断言就可以被访问
    switch (s.kind) {
      case "square":
        return s.size * s.size;
      case "rectangle":
        return s.width * s.height;
      case "circle":
        return Math.PI * s.radius * s.radius;
      case 1:
        return Math.PI * s.a * s.a;
    }
  }

  function test1(s: Shape) {
    if (s.kind === "square") {
      s; // Square
    } else {
      s; // Rectangle | Circle
    }
  }

  function test2(s: Shape) {
    if (s.kind === "square" || s.kind === "rectangle") {
      return;
    }
    s; // Circle
  }
}
/**
 * 相同属性 不同类型 非字面量 不能判断
 * */
{
  interface Square {
    kind: number;
    size: number;
  }

  interface Rectangle {
    kind: string;
    width: number;
    height: number;
  }

  interface Circle {
    kind: boolean;
    radius: number;
  }

  type Shape = Square | Rectangle | Circle;

  function test1(s: Shape) {
    if (typeof s.kind === "number") {
      // s.size;  // error
    } else {
      s; // Rectangle | Circle
    }
  }
}

export {};
