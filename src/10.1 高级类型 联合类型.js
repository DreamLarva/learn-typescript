"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    /**
     * Takes a string and adds "padding" to the left.
     * If 'padding' is a string, then 'padding' is appended to the left side.
     * If 'padding' is a number, then that number of spaces is added to the left side.
     */
    function padLeft(value, padding) {
        if (typeof padding === "number") {
            return Array(padding + 1).join(" ") + value;
        }
        else {
            /** 不用再判断 typeof padding === "string" */
            return padding + value;
        }
    }
    padLeft("Hello world", 4); // returns "    Hello world"
}
{
    let getSmallPet = function () {
        return {
            fly() {
            },
            layEggs() {
            }
        };
    };
    let pet = getSmallPet();
    pet.layEggs(); // 是共有成员 不用断言
    // pet.swim();    // 报错 非公有成员
    pet.swim(); // 断言后可以使用
}
{
    let getSmallPet = function () {
        if (Math.random() < 0.5) {
            // ts 直接通过 判断 fly 只有Bird 接口才有  这里就是直接认为
            // return 的 是 Bird 类型的了
            return {
                fly() {
                },
                layEggs() {
                    return "1";
                }
            };
        }
        else {
            // 直接判断为 Fish 类型
            return {
                swim() {
                },
                layEggs() {
                    return 1;
                }
            };
        }
    };
    let pet = getSmallPet();
    // 此处 希望你的参数 为 string & number 当然不可能有任何类型符合
    // 所以这种就必须先断言了
    // pet.layEggs(1); // error
    pet.layEggs("1"); // ok
}
//# sourceMappingURL=10.1 高级类型 联合类型.js.map