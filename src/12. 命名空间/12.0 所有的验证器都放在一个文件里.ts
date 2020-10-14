/** 所有的验证器都放在一个文件里 */
interface StringValidator {
  isAcceptable(s: string): boolean;
}

let lettersRegexp = /^[a-zA-Z]+$/;
let numberRegexp = /^[0-9]+$/;

class LettersOnlyValidator implements StringValidator {
  isAcceptable(s: string) {
    return lettersRegexp.test(s);
  }
}

class ZipCpdeValidator implements StringValidator {
  isAcceptable(s: string) {
    return lettersRegexp.test(s);
  }
}

let strings = ["Hello", "98052", "101"];

let validators: { [s: string]: StringValidator } = {};
validators["ZIP code"] = new ZipCpdeValidator();
validators["Letters only"] = new LettersOnlyValidator();

for (let s of strings) {
  for (let name in validators) {
    let isMatch = validators[name].isAcceptable(s);
    console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`);
  }
}

export {};
