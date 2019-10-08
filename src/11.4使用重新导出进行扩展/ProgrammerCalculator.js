"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Calculator_1 = require("./Calculator");
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
exports.Calculator = ProgrammerCalculator;
ProgrammerCalculator.digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
// Also, export the helper function
var Calculator_2 = require("./Calculator");
exports.test = Calculator_2.test;
//# sourceMappingURL=ProgrammerCalculator.js.map