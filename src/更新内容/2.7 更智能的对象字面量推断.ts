/**
 * 从2.7版本开始，TypeScript会“规范化”每个对象字面量类型记录每个属性，
 * 为每个 undefined类型属性插入一个可选属性，并将它们联合起来。
 * */
declare let someTest: boolean;
{
  // foo的最类型是 { value: number } | { value?: undefined }
  let foo = someTest ? { value: 42 } : {};
  // vsc 推断正确 但是 webstorm 推断为 {}
  // 使用上都还是正确额的
  foo.value; // foo.value 推断为 number | undefined
}
{
  // Has type
  //  | { a: boolean, aData: number, b?: undefined }
  //  | { b: boolean, bData: string, a?: undefined }
  let bar =
    Math.random() < 0.5 ? { a: true, aData: 100 } : { b: true, bData: "hello" };

  if (bar.b) {
    // TypeScript now knows that 'bar' has the type
    //
    //   '{ b: boolean, bData: string, a?: undefined }'
    //
    // so it knows that 'bData' is available.
    bar.bData.toLowerCase();
  }
}
/**
 * 非字面量 就不行
 * */
declare let bar1: { a: true; aData: 100 };
declare let bar2: { b: true; bData: "hello" };

let bar = Math.random() < 0.5 ? bar1 : bar2;

// error
// if (bar.b) {
//     bar.bData.toLowerCase()
// }

/**
 * 非字面量 就不行
 * */
{
  let bar!:
    | { a: true; aData: 100 }
    | { b: true; bData: "hello" }
    | { c: true; cData: [] };

  // if (bar.b) { // error
  //     bar.bData.toLowerCase() //error
  // }
}

export {};
