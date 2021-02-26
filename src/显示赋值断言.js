"use strict";
// 显示赋值断言
{
    let x;
    // x.map(() => {}); // error
}
{
    // 断言
    let x;
    // ... 进行 x 初始化
    x.map(() => { }); // ok 这里ts认为你已经 初始化了
}
//# sourceMappingURL=%E6%98%BE%E7%A4%BA%E8%B5%8B%E5%80%BC%E6%96%AD%E8%A8%80.js.map