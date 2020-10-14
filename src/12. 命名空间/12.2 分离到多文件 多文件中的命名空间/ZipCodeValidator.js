"use strict";
/// <reference path="Validation1.ts" />
var Validation1;
(function (Validation1) {
  const numberRegexp = /^[0-9]+$/;
  class ZipCodeValidator {
    isAcceptable(s) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
  Validation1.ZipCodeValidator = ZipCodeValidator;
})(Validation1 || (Validation1 = {}));
//# sourceMappingURL=ZipCodeValidator.js.map
