import { Calculator } from "./Calculator";
class ProgrammerCalculator extends Calculator {
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
            return (currentValue * this.base + ProgrammerCalculator.digits.indexOf(digit));
        }
    }
}
ProgrammerCalculator.digits = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
];
// Export the new extended calculator as Calculator
export { ProgrammerCalculator as Calculator };
// Also, export the helper function
export { test } from "./Calculator";
//# sourceMappingURL=ProgrammerCalculator.js.map