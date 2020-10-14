"use strict";
/// <reference path="Validation1.ts" />
var Validation1;
(function (Validation1) {
  const lettersRegexp = /^[A-Za-z]+$/;
  class LettersOnlyValidator {
    isAcceptable(s) {
      return lettersRegexp.test(s);
    }
  }
  Validation1.LettersOnlyValidator = LettersOnlyValidator;
})(Validation1 || (Validation1 = {}));
//# sourceMappingURL=LettersOnlyValidator.js.map
