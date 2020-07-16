"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=7.3 反向映射.js.map