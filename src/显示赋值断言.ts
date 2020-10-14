// 显示赋值断言
{
  let x: number[];

  // x.map(() => {}); // error
}

{
  // 断言
  let x!: number[];

  // ... 进行 x 初始化

  x.map(() => {}); // ok 这里ts认为你已经 初始化了
}
