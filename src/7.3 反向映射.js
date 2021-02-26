/**
 * 不会为字符串枚举成员生成反向映射
 * */
{
    let Enum;
    (function (Enum) {
        Enum[Enum["A"] = 0] = "A";
    })(Enum || (Enum = {}));
    let a = Enum.A;
    let nameOfA = Enum[a]; // "A"
    console.log(a, nameOfA);
}
{
    let Enum;
    (function (Enum) {
        Enum[Enum["A"] = 0] = "A";
        Enum[Enum["B"] = 1] = "B";
    })(Enum || (Enum = {}));
    let a = Enum.A;
    let nameOfA = Enum[a]; // "A"
    console.log(a, nameOfA);
}
export {};
//# sourceMappingURL=7.3%20%E5%8F%8D%E5%90%91%E6%98%A0%E5%B0%84.js.map