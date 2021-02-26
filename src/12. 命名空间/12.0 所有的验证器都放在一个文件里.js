let lettersRegexp = /^[a-zA-Z]+$/;
let numberRegexp = /^[0-9]+$/;
class LettersOnlyValidator {
    isAcceptable(s) {
        return lettersRegexp.test(s);
    }
}
class ZipCpdeValidator {
    isAcceptable(s) {
        return lettersRegexp.test(s);
    }
}
let strings = ["Hello", "98052", "101"];
let validators = {};
validators["ZIP code"] = new ZipCpdeValidator();
validators["Letters only"] = new LettersOnlyValidator();
for (let s of strings) {
    for (let name in validators) {
        let isMatch = validators[name].isAcceptable(s);
        console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`);
    }
}
export {};
//# sourceMappingURL=12.0%20%E6%89%80%E6%9C%89%E7%9A%84%E9%AA%8C%E8%AF%81%E5%99%A8%E9%83%BD%E6%94%BE%E5%9C%A8%E4%B8%80%E4%B8%AA%E6%96%87%E4%BB%B6%E9%87%8C.js.map