/**
 * 编译器会检测是否每个模块都会在生成的JavaScript中用到。 如果一个模块标识符只在类型注解部分使用，并且完全没有在表达式中使用时，就不会生成 require这个模块的代码。
 * 这种模式的核心是import id = require("...")语句可以让我们访问模块导出的类型。
 *
 * */
if (true) {
    /**
     * 为了确保类型安全性，我们可以使用typeof关键字。 typeof关键字，当在表示类型的地方使用时，会得出一个类型值，这里就表示模块的类型。
     * */
    let ZipCodeValidator = require("./ZipCodeValidator");
    let validator = new ZipCodeValidator();
    if (validator.isAcceptable("...")) {
        /* ... */
    }
}
export {};
//# sourceMappingURL=Node.js%E9%87%8C%E7%9A%84%E5%8A%A8%E6%80%81%E6%A8%A1%E5%9D%97%E5%8A%A0%E8%BD%BD.js.map