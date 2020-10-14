/**
 * 如果你给编译器设置了--noImplicitThis标记。 它会指出 this.suits[pickedSuit]里的this的类型为any。
 * 因为 返回的匿名函数 this 默认指向window (strict 模式下 指向 undefined)
 * */
/*
{
    let deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function () {
            return function () {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};  // Error
            }
        }
    };

    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();

    console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}
*/
{
  let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
      // 箭头函数 中的this  等同于 此处的 this
      return () => {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);
        return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      };
    },
  };
  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker();
  console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}
/**
 * ts中 提供一个显式的 this参数。 this参数是个假的参数，它出现在参数列表的最前面
 * */
{
  function fun() {
    // make sure `this` is unusable in this standalone function
  }
  let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function () {
      return () => {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);
        return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      };
    },
  };
  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker();
  console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}
/** this 在回调参数里 */
{
  class Handler {
    onClickGood(e) {
      // can't use this here because it's of type void!
      // this.a // error
      console.log("clicked!");
    }
  }
  let h = new Handler();
  class UIElementClass {
    addClickListener(a) {
      return 1;
    }
  }
  new UIElementClass().addClickListener(h.onClickGood);
}
{
  class Handler {
    onClickGood(e) {
      // can't use this here because it's of type void!
      // this.a // error
      console.log("clicked!");
    }
  }
  let h = new Handler();
  class UIElementClass {
    addClickListener(a) {
      return 1;
    }
  }
  new UIElementClass().addClickListener(h.onClickGood);
}
// 使用箭头函数 保留this
{
  class Handler {
    constructor() {
      this.onClickGood = (e) => {
        this.info = e.a;
      };
    }
  }
  let h = new Handler();
  let a = h.onClickGood;
  a({ a: "1" });
  console.log(h); // h.a => 1
}
export {};
//# sourceMappingURL=5.3 this.js.map
