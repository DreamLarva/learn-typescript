"use strict";
{
    /**
     * 枚举类型与数字类型兼容，并且**数字类型与枚举类型兼容**。不同枚举类型之间是不兼容的。
     * */
    let Status;
    (function (Status) {
        Status[Status["Ready"] = 0] = "Ready";
        Status[Status["Waiting"] = 1] = "Waiting";
    })(Status || (Status = {}));
    let Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Blue"] = 1] = "Blue";
        Color[Color["Green"] = 2] = "Green";
    })(Color || (Color = {}));
    let status = Status.Ready;
    status = 1; // 与数字类型兼容
    // status = Color.Green;  // Error 不同枚举类型不兼容
}
//# sourceMappingURL=9.2 兼容 枚举.js.map