"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ZipCodeValidator_1 = require("./ZipCodeValidator");
const LettersOnlyValidator_1 = require("./LettersOnlyValidator");
// Some samples to try
let strings = ["Hello", "98052", "101"];
// Validators to use
let validators = {};
validators["ZIP code"] = new ZipCodeValidator_1.ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator_1.LettersOnlyValidator();
// Show whether each string passed each validator
strings.forEach(s => {
    for (let name in validators) {
        console.log(`"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
    }
});
//# sourceMappingURL=Test.js.map