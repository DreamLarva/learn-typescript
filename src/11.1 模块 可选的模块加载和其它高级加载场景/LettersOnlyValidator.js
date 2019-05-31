"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lettersRegexp = /^[A-Za-z]+$/;
class LettersOnlyValidator {
    isAcceptable(s) {
        return lettersRegexp.test(s);
    }
}
exports.LettersOnlyValidator = LettersOnlyValidator;
//# sourceMappingURL=LettersOnlyValidator.js.map