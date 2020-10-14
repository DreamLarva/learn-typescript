const numberRegexp = /^[0-9]+$/;
export class ZipCodeValidator {
  isAcceptable(s) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
//# sourceMappingURL=ZipCodeValidator.js.map
