import { handler } from "./4.5 模板字符串作为判断式";


/**
 * 这种有 eval 的情况实际使用了 某个引用的内容
 * 但是在编译的时候并不能检测到
 * 导致最终编译的时候 会省略 import 的内容
 * 使用 --preserveValueImports 编译参数来 保留所有import
 * */
eval("console.log(handler)");



/**
 * 当和 --isolatedModules 一起使用的时候
 * */
// Which of these is a value that should be preserved? tsc knows, but `ts.transpileModule`,
// ts-loader, esbuild, etc. don't, so `isolatedModules` gives an error.

// import { someFunc, BaseType } from "./some-module.js";
//                    ^^^^^^^^
// Error: 'BaseType' is a type and must be imported using a type-only import
// when 'preserveValueImports' and 'isolatedModules' are both enabled.


