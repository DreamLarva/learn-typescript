"use strict";
/**
 * TypeScript 2.9允许传入泛型参数到标记模版字符串。
 * */
// inference fails because 'number' and 'string' are both candidates that conflict
let a = tag `${100} ${"hello"}`;
// let b = tag<string | number> `${true}`; // error
//# sourceMappingURL=2.9 泛型标记模版里的泛型参数.js.map