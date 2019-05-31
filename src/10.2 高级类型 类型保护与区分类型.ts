/**
 * 类型保护与区分类型（Type Guards and Differentiating Types）
 * 用于确切的区分类型
 * */

{
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

    // 每一个成员访问都会报错
    /*if (pet.swim) {
        pet.swim();
    } else if (pet.fly) {
        pet.fly();
    }*/


    /**
     * 使用类型断言
     * 在获取的值是联合类型 或者是 any 的时候 使用类型断言来指定某个类型
     * */
    if ((<Fish>pet).swim) {
        (<Fish>pet).swim();
    } else {
        (<Bird>pet).fly();
    }
}
/** 用户自定义的类型保护 */
{
    /**
     * 用户自定义的类型保护
     * TypeScript里的 类型保护机制让它成为了现实。 类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。
     * 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词：
     * */

    interface BirdType {
        fly(): void;

        layEggs(): void;
    }

    interface Fish {
        swim(): void;

        layEggs(): void;
    }

    class Birds implements BirdType {
        fly() {
        }

        layEggs() {
        }
    }

    /**
     * 谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。
     * */

    /**
     * 这个函数传入 Fish 或者 Bird 类型
     * 最后判断这个类型 是不是 Fish类型(返回值 必定是一个布尔值)
     * 返回的一定是个布尔值
     * */
    let isFish = function (pet: Fish | BirdType): pet is Fish {
        return (<Fish>pet).swim !== undefined;
        // return (<Fish>pet).swim !== undefined;
    };

    /** Birds类类型 兼容 BirdType接口类型 */
    let isBird = function (pet: Fish | BirdType): pet is Birds {
        return pet instanceof Birds
    };

    let doSomething = function (pet: Fish | BirdType) {

        /**
         * pet 利用isFish函数 判断是是不是 Fish 类型
         * 并且对应block 里面的不再需要类型断言
         * */
        if (isFish(pet)) {
            // 这个block 的pet 都是Fish 类型
            pet.swim()
        } else {
            // 这个block 的pet 都是Bird 类型
            pet.fly()
        }
    }
}
/** typeof类型保护 */
{
    /**
     * typeof类型保护
     * 直接使用 typeof 进行类型保护
     * 但是支持的类型 必须是 "number"， "string"， "boolean"或 "symbol"
     * */
    let padLeft = function (value: string, padding: string | number) {
        if (typeof padding === "number") {
            return Array(padding + 1).join(" ") + value;
        } else {
            return padding + value;
        }
    };
    /**
     * 但是TypeScript并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护。
     * 如:  Object undefined Function
     * */
}
/**
 * 可以通过 识别 不同的 字符串 字面量 带断言
 * */
{
    interface A {
        a: "1",
        b: string
    }

    interface B {
        a: "2",
        b: number
    }

    let padLeft = function (data: A | B): void {
        if (data.a === "1") {
            data.b.split("") // ok 推断为 data 为A
        }
        if (data.a === "2") {
            data.b.toFixed() // ok 推断为 data 为 B
        }

    }
}
/** instanceof类型保护 */
{
    /**
     * 既然使用 instanceof 关键字 那么一定使用的是 class 或者 构造函数 不能为interface
     * instanceof的右侧要求是一个构造函数，TypeScript将细化为：
     *  1. 此构造函数的 prototype属性的类型，如果它的类型不为 any的话
     *  2. 构造签名所返回的类型的联合
     * */
    interface Padder {
        getPaddingString(): string
    }

    class SpaceRepeatingPadder implements Padder {
        constructor(private numSpace: number) {
        }

        getPaddingString() {
            return Array(this.numSpace + 1).join(" ")
        }

        a() {
        }
    }

    class StringPadder implements Padder {
        constructor(private values: string) {
        }

        getPaddingString() {
            return this.values
        }

        b() {
        }
    }

    let getRandomPadder = function () {
        return Math.random() < 0.5 ?
            new SpaceRepeatingPadder(4) :
            new StringPadder("  ")
    };

    // 类型为SpaceRepeatingPadder | stringPadder
    let padder: Padder = getRandomPadder();
    if (padder instanceof SpaceRepeatingPadder) {
        padder.a() // 类型细化为 SpaceRepeatingPadder
    }
    if (padder instanceof StringPadder) {
        padder.b() // 类型细化为 StringPadder
    }
}
/** 可以为null 的类型*/
{
    /**
     *  默认情况下，类型检查器认为 null与 undefined可以赋值给任何类型。
     *  *** null与 undefined是所有其它类型的一个有效值。***
     *  --strictNullChecks标记可以解决此错误
     * */
    {
        let s = "foo";
        // s = null; // 错误, 'null'不能赋值给'string'
        let sn: string | null = "bar";
        sn = null; // 可以
    }

    /** 可选参数 */
    {
        let f = function (x: number, y?: number): number {
            return x + (y || 0);
        };
        f(1, 2);
        f(1);
        f(1, undefined);
        // f(1, null); // error, 'null' is not assignable to 'number | undefined'
    }

    /** 可选属性 */
    {
        class C {
            a!: number;
            b?: number;
        }
        let c = new C();
        c.a = 12;
        // c.a = undefined; // error, 'undefined' is not assignable to 'number'
        c.b = 13;
        c.b = undefined; // ok
        // c.b = null; // error, 'null' is not assignable to 'number | undefined'
    }

    /** 类型保护和类型断言 */
    {
        let f = function (sn: string | null): string {
            /** 断言为null */
            if (sn == null) {
                return "default";
            } else {
                return sn;
            }
        };

        /** 短路逻辑 */
        let f1 = function (sn: string | null): string {
            return sn || "default";
        }
    }
    /**
     * 使用类型断言手动去除。
     * 语法是添加 !后缀： identifier!从 identifier的类型里去除了 null和 undefined
     * */
    {
        function fixed(name: string | null): string {
            function postfix(epithet: string) {
                return name!.charAt(0) + '.  the ' + epithet; // ok
            }
            name = name || "Bob";
            return postfix("great");
        }
    }
}


export {}
