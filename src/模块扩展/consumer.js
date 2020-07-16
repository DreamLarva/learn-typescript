"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observable_1 = require("./observable");
// import "./map";
// 虽然 不引入map 还是能够 提示 o.map 但是实际运行就会报错
let o = new observable_1.Observable(1);
o.map(x => x.toFixed());
//# sourceMappingURL=consumer.js.map