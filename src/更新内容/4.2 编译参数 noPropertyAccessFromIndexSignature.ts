interface Options {
  /** File patterns to be excluded. */
  exclude?: string[];

  /**
   * It handles any extra properties that we haven't declared as type 'any'.
   */
  [x: string]: any;
}



/**
 * 当编译选项中有 --noPropertyAccessFromIndexSignature
 * opts.excludes 报错
 *
 * 用于定义 参数索引但在 代码中不能使用
 * */
function processOptions1(opts: Options) {
  // Notice we're *intentionally* accessing `excludes`, not `exclude`
  if (opts.excludes) {
    console.error("The option `excludes` is not valid. Did you mean `exclude`?");
  }
}


function processOptions2(opts: Options) {
  // ...

  // Notice we're *accidentally* accessing `excludes` this time.
  // Oops! Totally valid.
  for (const excludePattern of opts.excludes) {
    // ...
  }
}
