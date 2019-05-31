"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
    isAcceptable(s) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
exports.ZipCodeValidator = ZipCodeValidator;
//# sourceMappingURL=ZipCodeValidator.js.map