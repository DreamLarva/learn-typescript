export class Calculator {
    constructor() {
        this.current = 0;
        this.memory = 0;
    }
    handleChar(char) {
        if (char === "=") {
            this.evaluate();
            return;
        }
        else {
            let value = this.processDigit(char, this.current);
            if (value !== undefined) {
                this.current = value;
                return;
            }
            else {
                let value = this.processOperator(char);
                if (value !== undefined) {
                    this.evaluate();
                    this.operator = value;
                    return;
                }
            }
        }
        throw new Error(`Unsupported input: '${char}'`);
    }
    getResult() {
        return this.memory;
    }
    processDigit(digit, currentValue) {
        if (digit >= "0" && digit <= "9") {
            return currentValue * 10 + (digit.charCodeAt(0) - "0".charCodeAt(0));
        }
    }
    processOperator(operator) {
        if (["+", "-", "*", "/"].indexOf(operator) >= 0) {
            return operator;
        }
    }
    evaluateOperator(operator, left, right) {
        switch (this.operator) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                return left / right;
            default:
                throw new Error("unknown operator");
        }
    }
    evaluate() {
        if (this.operator) {
            this.memory = this.evaluateOperator(this.operator, this.memory, this.current);
        }
        else {
            this.memory = this.current;
        }
        this.current = 0;
    }
}
export function test(c, input) {
    for (let i = 0; i < input.length; i++) {
        c.handleChar(input[i]);
    }
    console.log(`result of '${input}' is '${c.getResult()}'`);
}
//# sourceMappingURL=Calculator.js.map