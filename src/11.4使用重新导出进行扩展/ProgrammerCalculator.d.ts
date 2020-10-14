import { Calculator } from "./Calculator";
declare class ProgrammerCalculator extends Calculator {
  base: number;
  static digits: string[];
  constructor(base: number);
  protected processDigit(
    digit: string,
    currentValue: number
  ): number | undefined;
}
export { ProgrammerCalculator as Calculator };
export { test } from "./Calculator";
