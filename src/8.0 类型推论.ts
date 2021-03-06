{
  /** 基础*/
  let x = 3;
  // 凡是和x 有关(运算 赋值 等)的类型都会推断为number 类型
  // 相当于
  let x1: number = 3;
}

{
  /**
   * 最佳通用类型
   * 当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型.
   * */
  let x = [0, 1, null];
  // 为了推断x的类型，我们必须考虑所有元素的类型。 这里有两种选择： number和null。 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。
  // 所以相当于
  let x1: Array<null | number> = [0, 1, null];

  class Animal {}

  class Rhino extends Animal {}

  class Elephant extends Animal {}

  class Snake extends Animal {}

  let zoo = [new Rhino(), new Elephant(), new Snake()];
  // 默认推断为
  let zoo1: Array<Rhino | Elephant | Snake> = [
    new Rhino(),
    new Elephant(),
    new Snake(),
  ];
  // 如果想要重新推断为 父类就要重新声明类型 (可能导致 类型问题 具体可以查看协变(covariance) 和 抗变(contravariance).md)
  let zoo2: Array<Animal> = [new Rhino(), new Elephant(), new Snake()];

  // 如果没有 父类声明 这里依然是 联合类型
  function createZoo(): Animal[] {
    return [new Rhino(), new Elephant(), new Snake()];
  }
}
{
  /**  上下文类型 */
  window.onmousedown = function (mouseEvent: MouseEvent) {
    // 3.5 版本 还不需要:MouseEvent 3.6 又需要了  vscode 不能检查出问题 但是编译报错 webstorm 在检查时就能知道问题
    // 已经推断了为mouse的Event类型
    console.log(mouseEvent.button);
  };

  /**
   * */
  document.getElementById("test")!.addEventListener("keydown", function (e) {
    // 推断为 按键的Event类型
    console.log(e.altKey);
  });
}
/**
 * From 2.4
 * 返回类型作为推断目标
 * */
{
  function arrayMap<T, U>(f: (x: T) => U): (a: T[]) => U[] {
    return (a) => a.map(f);
  }

  const lengths: (a: string[]) => number[] = arrayMap((s) => s.length);
  // 等同于
}
{
  // 推断类型为 arrayMap(f: (x: T) => U): (a: T[]) => U[] 同上
  function arrayMap<T, U>(f: (x: T) => U) {
    return (a: T[]) => a.map(f);
  }

  // 推断为 lengths: (a: string[]) => number[] 同上
  // 相当于 将T 设为 string 同时 由 T 推断了 S 为 number
  const lengths = arrayMap((s: string) => s.length);
}
/**
 * From 2.7
 * 更智能的对象字面量推断
 * */
{
  let someTest!: boolean;
  let foo = someTest ? { value: 42 } : {}; // foo 在ide 显示的类型为 {}
  // 实际类型 为 { value: number } | { value?: undefined } 保留类 value number 的 可能性

  if (foo.value) {
    const a = foo.value.toFixed(1); // 正确推断为 number 类型
  }

  let a = someTest ? { a: 1 } : { a: "string" }; // a 正确推断的类型为 {a:string} | {a:number}
  let b = someTest ? { a: 1 } : { b: 2 }; // a 正确推断的类型为 {a:string} | {b:number}
}
/**
 * From 4.1
 * unknown 和 any 在类型推断时被认为是 falsy类型
 * 修复这个类型判断的方法 就是强制转成 boolean 类型
 * */
{
  let foo!: unknown;
  let somethingElse!: { someProp: string };
  let x = foo && somethingElse; // unknown
  let y = !!foo && somethingElse; // false | somethingElse
}
{
  let foo!: any;
  let somethingElse!: { someProp: string };
  let x = foo && somethingElse; // any
  let y = !!foo && somethingElse; // false | somethingElse

}

export {};
