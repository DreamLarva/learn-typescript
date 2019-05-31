/// <reference path="Validation1.d.ts" />
declare namespace Validation1 {
    class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string): boolean;
    }
}
