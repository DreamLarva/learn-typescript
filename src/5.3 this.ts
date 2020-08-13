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
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    };

    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();

    console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}

/**
 * ts中 提供一个显式的 this参数。 this参数是个假的参数，它出现在参数列表的最前面
 * */
{
    function fun(this: void) {
        // make sure `this` is unusable in this standalone function
    }

    interface Card {
        suit: string;
        card: number;
    }

    interface Deck {
        suits: string[];
        cards: number[];

        createCardPicker(this: Deck): () => Card;
    }

    let deck: Deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        // NOTE: The function now explicitly specifies that its callee must be of type Deck
        createCardPicker: function (this: Deck) {
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);

                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    };

    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();

    console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

}
/** this 在回调参数里 */
{
    interface UIElement {
        /**
         * 函数类型接口
         * 需要传入一个onclick函数 类型为(this: void, e: Event) => void
         * 其中 this 为 void 就是说这个函数调用的上下文必须是void
         * */
        addClickListener(onclick: (this: void, e: Event) => void): void;
    }

    class Handler {
        info!: string;

        onClickGood(this: void, e: Event) {
            // can't use this here because it's of type void!
            // this.a // error
            console.log('clicked!');
        }
    }

    let h = new Handler();

    class UIElementClass implements UIElement {
        addClickListener(a: any) {
            return 1
        }
    }

    new UIElementClass().addClickListener(h.onClickGood);
}
{
    interface UIElement {
        /**
         * 函数类型接口
         * 需要传入一个onclick函数 类型为(this: void, e: Event) => void
         * 其中 this 为 void 就是说这个函数调用的上下文必须是void
         * */
        addClickListener(onclick: (this: void, e: Event) => void): void;
    }

    class Handler {
        info!: string;

        onClickGood(this: void, e: Event) {
            // can't use this here because it's of type void!
            // this.a // error
            console.log('clicked!');
        }
    }

    let h = new Handler();

    class UIElementClass implements UIElement {
        addClickListener(a: any) {
            return 1
        }
    }

    new UIElementClass().addClickListener(h.onClickGood);
}
// 使用箭头函数 保留this
{
    class Handler {
        info!: any;
        onClickGood = (e: { a: string }) => {
            this.info = e.a
        }
    }

    let h = new Handler();
    let a = h.onClickGood;
    a({a: "1"});

    console.log(h) // h.a => 1
}

export {}
