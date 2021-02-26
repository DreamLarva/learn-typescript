const lettersRegexp = /^[A-Za-z]+$/;
export class LettersOnlyValidator {
    isAcceptable(s) {
        return lettersRegexp.test(s);
    }
}
//# sourceMappingURL=LettersOnlyValidator.js.map