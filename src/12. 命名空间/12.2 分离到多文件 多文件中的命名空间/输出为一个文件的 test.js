/// <reference path="Validation1.ts" />
var Validation1;
(function (Validation1) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var LettersOnlyValidator = /** @class */ (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s) {
            return lettersRegexp.test(s);
        };
        return LettersOnlyValidator;
    }());
    Validation1.LettersOnlyValidator = LettersOnlyValidator;
})(Validation1 || (Validation1 = {}));
/// <reference path="Validation1.ts" />
var Validation1;
(function (Validation1) {
    var numberRegexp = /^[0-9]+$/;
    var ZipCodeValidator = /** @class */ (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length === 5 && numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    Validation1.ZipCodeValidator = ZipCodeValidator;
})(Validation1 || (Validation1 = {}));
/// <reference path="Validation1.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />
/**
 * 合并了三个文件夹中的 Validation1 命名空间
 * */
// Some samples to try
var strings2 = ["Hello", "98052", "101"];
// Validators to use
var validators2 = {};
validators2["ZIP code"] = new Validation1.ZipCodeValidator();
validators2["Letters only"] = new Validation1.LettersOnlyValidator();
// Show whether each string passed each validator
for (var _i = 0, strings2_1 = strings2; _i < strings2_1.length; _i++) {
    var s = strings2_1[_i];
    for (var name_1 in validators2) {
        console.log("\"" + s + "\" - " + (validators2[name_1].isAcceptable(s) ? "matches" : "does not match") + " " + name_1);
    }
}
