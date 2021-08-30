/**
 * 在 4.4 中 如果类型守卫是一个 const ,readonly property 或者 不可修改的参数 , ts 就能正确的指向它
 * */

{
  type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; sideLength: number };

  function area(shape: Shape): number {
    const isCircle = shape.kind === "circle";
    if (isCircle) {
      // We know we have a circle here!
      return Math.PI * shape.radius ** 2;
    } else {
      // We know we're left with a square here!
      return shape.sideLength ** 2;
    }
  }
}

// 结构出的的值, 也能正确判断 ,所在对象
{
  type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; sideLength: number };

  function area(shape: Shape): number {
    const { kind } = shape;

    if (kind === "circle") {
      // We know we have a circle here!
      return Math.PI * shape.radius ** 2;
    } else {
      // We know we're left with a square here!
      return shape.sideLength ** 2;
    }
  }
}

// 复杂的判断
{
  function doSomeChecks(
    inputA: string | undefined,
    inputB: string | undefined,
    shouldDoExtraWork: boolean
  ) {
    const mustDoWork = inputA && inputB && shouldDoExtraWork;
    if (mustDoWork) {
      // We can access 'string' properties on both 'inputA' and 'inputB'!
      const upperA = inputA.toUpperCase();
      const upperB = inputB.toUpperCase();
      // ...
    }
  }
}
//
{
  function f(x: string | number | boolean) {
    const isString = typeof x === "string";
    const isNumber = typeof x === "number";
    const isStringOrNumber = isString || isNumber;
    if (isStringOrNumber) {
      x;  // Type of 'x' is 'string | number'.
    }
    else {
      x;  // Type of 'x' is 'boolean'.
    }
  }
}
