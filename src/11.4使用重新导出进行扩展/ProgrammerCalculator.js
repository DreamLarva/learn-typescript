"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
const Calculator_1 = require("./Calculator");
let ProgrammerCalculator = /** @class */ (() => {
    class ProgrammerCalculator extends Calculator_1.Calculator {
        constructor(base) {
            super();
            this.base = base;
            const maxBase = ProgrammerCalculator.digits.length;
            if (base <= 0 || base > maxBase) {
                throw new Error(`base has to be within 0 to ${maxBase} inclusive.`);
            }
        }
        processDigit(digit, currentValue) {
            if (ProgrammerCalculator.digits.indexOf(digit) >= 0) {
                return currentValue * this.base + ProgrammerCalculator.digits.indexOf(digit);
            }
        }
    }
    ProgrammerCalculator.digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    return ProgrammerCalculator;
})();
exports.Calculator = ProgrammerCalculator;
// Also, export the helper function
var Calculator_2 = require("./Calculator");
Object.defineProperty(exports, "test", { enumerable: true, get: function () { return Calculator_2.test; } });
//# sourceMappingURL=ProgrammerCalculator.js.map