/// <reference path="Validation1.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

/**
 * 合并了三个文件夹中的 Validation1 命名空间
 * 编译的指令 需要提那家 --outFile参数
 *
 *  方法 1
 *  tsc --outFile sample.js Test.ts 直接编译 test.ts 文件 为 sample.js (会加入所有的依赖)
 *  或者
 *  tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts 让编译器自动排序 最终输出的还是一个文件
 *
 *  方法2
 *  每个分别编译成一个文件
 *  分别引入作为一个 <script> 标签
 * */
// Some samples to try
let strings2 = ["Hello", "98052", "101"];

// Validators to use
let validators2: { [s: string]: Validation1.StringValidator; } = {};
validators2["ZIP code"] = new Validation1.ZipCodeValidator();
validators2["Letters only"] = new Validation1.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings2) {
    for (let name in validators2) {
        console.log(`"${s}" - ${validators2[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
    }
}
