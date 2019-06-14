"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observable_1 = require("./observable");
observable_1.Observable.prototype.map = function (f) {
    return new observable_1.Observable(f(this.val));
};
//# sourceMappingURL=map.js.map