{
    interface StringArray {
        [index: number]: string
    }

    let myArray: StringArray;
    myArray = ["Bob", "Fred"];

    let myStr: string = myArray[0];
}

{
    /**
     * 共有支持两种索引签名：字符串和数字。
     * 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
     * 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。
     * 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。
     * */
    class Animal {
        name?: string;
    }

    class Dog extends Animal {
        breed?: string;
    }

    // dog 是 animal 的子类
    interface NotOkay {
        [x: number]: Dog;
        [x: string]: Animal;
    }
}
{
    interface NumberDictionary {
        [index: string]: number;
        length: number;    // 可以，length是number类型
        // name: string     // 错误，`name`的类型与索引类型返回值的类型不匹配(必须是和索引的类型相同 或者是 索引的类型的子类相同)
    }
}
{
    interface ReadonlyStringArray {
        readonly [index: number]: string;
    }
    let myArray: ReadonlyStringArray = ["Alice", "Bob"];
    // myArray[2] = "Mallory"; // error!
}
{
    // 可以将索引签名设置为只读，这样就防止了给索引赋值
    interface ReadonlyStringArray {
        readonly [index: number]: string;
    }
    let myArray: ReadonlyStringArray = ["Alice", "Bob"];
    // myArray[2] = "Mallory"; // error!

}
export {}
