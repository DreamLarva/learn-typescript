"use strict";
/**
 * 随着更多验证器的加入，我们需要一种手段来组织代码，以便于在记录它们类型的同时还不用担心与其它对象产生命名冲突。
 * 因此，我们把验证器包裹到一个命名空间内，而不是把它们放在全局命名空间下。
 * */
/**
 * 下面的例子里，把所有与验证器相关的类型都放到一个叫做Validation的命名空间里。
 * 因为我们想让这些接口和类在命名空间之外也是可访问的，所以需要使用 export。
 * 相反的，变量 lettersRegexp和numberRegexp是实现的细节，不需要导出，因此它们在命名空间外是不能访问的。
 * 在文件末尾的测试代码里，由于是在命名空间之外访问，因此需要限定类型的名称，比如 Validation0.LettersOnlyValidator。
 * */
var Validation0;
(function (Validation0) {
    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;
    class LettersOnlyValidator {
        isAcceptable(s) {
            return lettersRegexp.test(s);
        }
    }
    Validation0.LettersOnlyValidator = LettersOnlyValidator;
    class ZipCodeValidator {
        isAcceptable(s) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
    Validation0.ZipCodeValidator = ZipCodeValidator;
})(Validation0 || (Validation0 = {}));
// Some samples to try
let strings1 = ["Hello", "98052", "101"];
let validators1 = {};
validators2["ZIP code"] = new Validation0.ZipCodeValidator();
validators1["Letters only"] = new Validation0.LettersOnlyValidator();
for (let s of strings1) {
    for (let name in validators1) {
        console.log(`"${s}" - ${validators2[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
    }
}
//# sourceMappingURL=12.1%20%E4%BD%BF%E7%94%A8%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4%E7%9A%84%E9%AA%8C%E8%AF%81%E5%99%A8.js.map