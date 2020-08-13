{
    /**
     * Takes a string and adds "padding" to the left.
     * If 'padding' is a string, then 'padding' is appended to the left side.
     * If 'padding' is a number, then that number of spaces is added to the left side.
     */
    function padLeft(value: string, padding: string | number) {
        if (typeof padding === "number") {
            return Array(padding + 1).join(" ") + value;
        } else {
            /** 不用再判断 typeof padding === "string" */
            return padding + value;
        }
    }

    padLeft("Hello world", 4); // returns "    Hello world"
}
{
    /** 如果一个值是联合类型，我们只能访问此联合类型的所有类型里**共有的成员**。*/
    interface Bird {
        fly(): void;

        layEggs(): void;
    }

    interface Fish {
        swim(): void;

        layEggs(): void;
    }

    let getSmallPet = function (): Fish | Bird {
        return {
            fly() {
            },
            layEggs() {
            }
        }
    };

    let pet = getSmallPet();
    pet.layEggs(); // 是共有成员 不用断言
    // pet.swim();    // 报错 非公有成员

    (<Fish>pet).swim(); // 断言后可以使用

}
{
    interface Bird {
        fly(): void;

        layEggs(a: string): string;
    }

    interface Fish {
        swim(): void;

        layEggs(a: number): number;
    }

    let getSmallPet = function (): Fish | Bird {
        if (Math.random() < 0.5) {
            // ts 直接通过 判断 fly 只有Bird 接口才有  这里就是直接认为
            // return 的 是 Bird 类型的了
            return {
                fly() {
                },
                layEggs(): string {
                    return "1"
                }
            }
        } else {
            // 直接判断为 Fish 类型
            return {
                swim() {
                },
                layEggs(): number {
                    return 1
                }
            }
        }

    };

    let pet = getSmallPet();
    // 此处 希望你的参数 为 string & number 当然不可能有任何类型符合
    // 所以这种就必须先断言了
    // pet.layEggs(1); // error
    (<Bird>pet).layEggs("1") // ok

}

/**
 * 对象中含有 联合类型
 * 等同于 笛卡尔积的所有类型
 * */
{
    type A = { a: 1 | 2 };
    type B = { a: 1 } | { a: 2 };

    function fun(a: A, b: B) {
        a = b;
        b = a
    }

    type C = { a: 1 | 2, b: 3 | 4 }
    type D = { a: 1, b: 3 } | { a: 1, b: 4 } | { a: 2, b: 3 } | { a: 2, b: 4 };

    function fun1(c: C, d: D) {
        c = d;
        d = c;
    }

    type E = [1 | 2];
    type F = [1] | [2]

    function fun3(e: E, f: F) {
        e = f;
        // f = e // error
    }

}

export {}
