/** 字符串字面量类型 */
{
  /**
   *  在实际应用中，字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。 通过结合使用这些特性，你可以实现类似枚举类型的字符串。
   *  还是优先用枚举吧
   * */
  type Easing = "ease-in" | "ease-out" | "ease-in-out";

  class UIElement {
    animate(dx: unknown, dy: number, easing: Easing) {
      if (easing === "ease-in") {
        // ...
      } else if (easing === "ease-out") {
      } else if (easing === "ease-in-out") {
      } else {
        // error! should not pass null or undefined.
      }
    }
  }

  let button = new UIElement();
  button.animate(0, 0, "ease-in");
  // button.animate(0, 0, "uneasy"); // Error 不能传入非指定的字符串
}
/** 字符串字面量 重载 */
{
  function createElement(tagName: "img"): HTMLImageElement;
  function createElement(tagName: "input"): HTMLInputElement;
  // ... more overloads ...
  function createElement(tagName: string): any {
    // ... code goes here ...
  }
}

/** 数字字面量 */
{
  function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
    // ...
    return 1;
  }

  function foo(x: number) {
    // 非法的检查
    // if (x !== 1 || x !== 2) {
    //     //         ~~~~~~~
    //     // Operator '!==' cannot be applied to types '1' and '2'.
    // }
  }
}
/** 枚举成员类型 */
{
  /**
   * 联合类型使用多个 枚举 或者 还有数字的时候
   * 会有冲突 导致不能正确判断是 那个枚举中的 或者 是某个数字
   * */

  /** 每个枚举成员都是用字面量初始化的时候枚举成员是具有类型的 */
  enum Aenum {
    a,
    b,
    c,
  }

  enum Benum {
    a,
    b,
    c,
  }

  const enum Cenum {
    a,
    b,
    c,
  }

  let test = function (param: Aenum | Benum | Cenum | "string" | 1) {
    // 没错这里  Aenum.a  Benum.a Cenum.a 都为 0
    // From 5.5 已经能够判断出 只能false
    // if (Aenum.a) {
    // }
    // if (Benum.a) {
    // }
    // if (Cenum.a) {
    // }
  };

  // 没错这里  Aenum.a  Benum.a Cenum.a 都为 0
  test(1);
  test("string");
  test(Aenum.a);
  test(Benum.a);
  test(Cenum.a);
}

export {};
