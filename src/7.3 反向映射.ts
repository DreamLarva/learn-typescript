/**
 * 不会为字符串枚举成员生成反向映射
 * */
{
    enum Enum {
        A
    }

    let a = Enum.A;
    let nameOfA = Enum[a]; // "A"
    console.log(a, nameOfA)
}

{
    enum Enum {
        A,
        B
    }

    let a = Enum.A;
    let nameOfA = Enum[a]; // "A"
    console.log(a, nameOfA)
}


export {}
