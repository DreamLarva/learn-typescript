export declare class Calculator {
    private current;
    private memory;
    private operator;
    handleChar(char: string): void;
    getResult(): number;
    protected processDigit(digit: string, currentValue: number): number | undefined;
    protected processOperator(operator: string): string | undefined;
    protected evaluateOperator(operator: string, left: number, right: number): number;
    private evaluate;
}
export declare function test(c: Calculator, input: string): void;
