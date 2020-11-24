/**
 *
 * 推断为 对象的时候 要放在靠下的位置
 * */
{
  let suits = ["hearts", "spades", "clubs", "diamonds"];

  function pickCard(x: number): { suit: string; card: number };
  function pickCard(x: { suit: string; card: number }[]): number;
  function pickCard(x: any): any {
    if (typeof x === "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
    }
    if (typeof x === "string") {
      let pickedSuit = Math.floor(parseFloat(x) / 13);
      return { suit: suits[pickedSuit], card: parseFloat(x) % 13 };
    }

    if (Array.isArray(x)) {
      // 推断为数组
      x.forEach((value) => {
        // value.suit 推断为 string
        // value.card 推断为 number
      });
      return Math.floor(Math.random() * x.length);
    }
  }

  let myDeck = [
    { suit: "diamonds", card: 2 },
    { suit: "spades", card: 10 },
    { suit: "hearts", card: 4 },
  ];
  let pickedCard1 = myDeck[pickCard(myDeck)];
  console.log("card: " + pickedCard1!.card + " of " + pickedCard1!.suit);

  let pickedCard2 = pickCard(15);
  console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
}
/**
 * 多个参数的情况下
 * 最后一个函数(有函数体)中 的类型必须兼容
 * */
{
  function fun(a: number, b: number): number;
  function fun(a: string, b: string): string;
  function fun(a: boolean): boolean;
  function fun(a: string, b?: boolean): boolean;
  function fun(a: any, b?: any): any {
    if (typeof a === "number" && typeof b === "number") {
      a.toFixed();
      b.toFixed();
    }

    if (typeof a === "string" && typeof b === "string") {
      a.length;
      b.length;
    }
  }

  // fun(1) // error
  fun(1, 2);
  fun(true);
  fun("1", false);
  fun("1", "2");
}
{
  /**
   * 当然可以出现不同的 参数名
   * */
  type returnData = {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  function padding(all: number): returnData;
  function padding(topAndBottom: number, leftAndRight: number): returnData;
  function padding(
    top: number,
    right: number,
    bottom: number,
    left: number
  ): returnData;
  // Actual implementation that is a true representation of all the cases the function body needs to handle
  function padding(a: number, b?: number, c?: number, d?: number): returnData {
    if (b === undefined && c === undefined && d === undefined) {
      b = c = d = a;
    } else if (c === undefined && d === undefined) {
      c = a;
      d = b;
    }
    return {
      top: a,
      right: b!,
      bottom: c!,
      left: d!,
    };
  }
}

export {};
