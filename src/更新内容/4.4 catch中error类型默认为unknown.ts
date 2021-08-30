/**
 * 使用 --useUnknownInCatchVariables 编译参数
 * 现在包含在 --strict 参数中
 * */
try {
  // ...
} catch (err) {
  // err: unknown

  // Error! Property 'message' does not exist on type 'unknown'.
  // console.error(err.message);

  // Works! We can narrow 'err' from 'unknown' to 'Error'.
  if (err instanceof Error) {
    console.error(err.message);
  }
}

// 还是可以直接断言
try {
  // ...
} catch (err: any) {
  console.error(err.message);
}
