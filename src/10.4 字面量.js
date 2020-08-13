/** 字符串字面量类型 */
{
    class UIElement {
        animate(dx, dy, easing) {
            if (easing === "ease-in") {
                // ...
            }
            else if (easing === "ease-out") {
            }
            else if (easing === "ease-in-out") {
            }
            else {
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
    // ... more overloads ...
    function createElement(tagName) {
        // ... code goes here ...
    }
}
/** 数字字面量 */
{
    function rollDie() {
        // ...
        return 1;
    }
    function foo(x) {
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
    let Aenum;
    (function (Aenum) {
        Aenum[Aenum["a"] = 0] = "a";
        Aenum[Aenum["b"] = 1] = "b";
        Aenum[Aenum["c"] = 2] = "c";
    })(Aenum || (Aenum = {}));
    let Benum;
    (function (Benum) {
        Benum[Benum["a"] = 0] = "a";
        Benum[Benum["b"] = 1] = "b";
        Benum[Benum["c"] = 2] = "c";
    })(Benum || (Benum = {}));
    let test = function (param) {
        // 没错这里  Aenum.a  Benum.a Cenum.a 都为 0
        if (Aenum.a) {
        }
        if (Benum.a) {
        }
        if (0 /* a */) {
        }
    };
    // 没错这里  Aenum.a  Benum.a Cenum.a 都为 0
    test(1);
    test("string");
    test(Aenum.a);
    test(Benum.a);
    test(0 /* a */);
}
//# sourceMappingURL=10.4 字面量.js.map