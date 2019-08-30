"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const record = {
    "key": {
        a: 1,
        b: 1,
        c: "string",
        d: true,
        e: () => { }
    }
};
const Parameters_1 = []; // 无参数 就是 空数组
function f1(s) {
    return { a: 1, b: s };
}
class C {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
const Omit_1_1 = { d: true }; // 排除了属性 a,b,c,e 现在只能有d
//# sourceMappingURL=常用工具类型.js.map