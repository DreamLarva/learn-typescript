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
//# sourceMappingURL=12.0 所有的验证器都放在一个文件里.js.map