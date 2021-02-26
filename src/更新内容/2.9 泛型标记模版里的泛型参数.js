"use strict";
/**
 * TypeScript 2.9允许传入泛型参数到标记模版字符串。
 * */
// inference fails because 'number' and 'string' are both candidates that conflict
let a = tag `${100} ${"hello"}`;
// let b = tag<string | number> `${true}`; // error
//# sourceMappingURL=2.9%20%E6%B3%9B%E5%9E%8B%E6%A0%87%E8%AE%B0%E6%A8%A1%E7%89%88%E9%87%8C%E7%9A%84%E6%B3%9B%E5%9E%8B%E5%8F%82%E6%95%B0.js.map