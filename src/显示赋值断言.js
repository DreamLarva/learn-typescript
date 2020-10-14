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
  x.map(() => {}); // ok 这里ts认为你已经 初始化了
}
//# sourceMappingURL=显示赋值断言.js.map
