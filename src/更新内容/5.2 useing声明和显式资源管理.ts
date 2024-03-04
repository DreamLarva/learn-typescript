import fs from "fs";

/**
 * 需要这些 polyfill
 * Symbol.dispose
 * Symbol.asyncDispose
 * DisposableStack
 * AsyncDisposableStack
 * SuppressedError
 *
 * ts.config 配置
 * {
 *     "compilerOptions": {
 *         "target": "es2022", 或 以下
 *         "lib": ["es2022", "esnext.disposable", "dom"] 需要 包换 "esnext" or "esnext.disposable"
 *     }
 * }
 * */

function loggy(id: string): Disposable {
  console.log(`Creating ${id}`);

  return {
    [Symbol.dispose]() {
      console.log(`Disposing ${id}`);
    }
  }
}

/**
 * 同步
 * */
{
  function func() {
    using a = loggy("a");
    using b = loggy("b");
    {
      using c = loggy("c");
      using d = loggy("d");
    }
    using e = loggy("e");
    return;

    // Unreachable.
    // Never created, never disposed.
    // using f = loggy("f");
  }

  func();
// Creating a
// Creating b
// Creating c
// Creating d
// Disposing d
// Disposing c
// Creating e
// Disposing e
// Disposing b
// Disposing a
}


/**
 * 异步
 * */
{
  async function doWork() {
    // Do fake work for half a second.
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  function loggy(id: string): AsyncDisposable {
    console.log(`Constructing ${id}`);
    return {
      async [Symbol.asyncDispose]() {
        console.log(`Disposing (async) ${id}`);
        await doWork();
      },
    }
  }

  async function func() {
      await using a = loggy("a");
      await using b = loggy("b");
    {
        await using c = loggy("c");
        await using d = loggy("d");
    }
      await using e = loggy("e");
    return;

    // Unreachable.
    // Never created, never disposed.
    //   await using f = loggy("f");
  }

  func();
  // Constructing a
  // Constructing b
  // Constructing c
  // Constructing d
  // Disposing (async) d
  // Disposing (async) c
  // Constructing e
  // Disposing (async) e
  // Disposing (async) b
  // Disposing (async) a
}


/**
 * 使用对象
 * */
{
  class TempFile implements Disposable {
    #path: string;
    #handle: number;

    constructor(path: string) {
      this.#path = path;
      this.#handle = fs.openSync(path, "w+");
    }

    // other methods

    [Symbol.dispose]() {
      // Close the file and delete it.
      fs.closeSync(this.#handle);
      fs.unlinkSync(this.#path);
    }
  }

  function doSomeWork() {
    using file = new TempFile(".some_temp_file");

    // use file...


    if (Math.random() > 0.5) {
      // do some more work...
      return;
    }
  }
}

/**
 * DisposableStack 和 AsyncDisposableStack
 * 可以手动 预约析构函数
 * */
function doSomeWork() {
  const path = ".some_temp_file";
  const file = fs.openSync(path, "w+");

  using cleanup = new DisposableStack();
  cleanup.defer(() => {
    fs.closeSync(file);
    fs.unlinkSync(path);
  });

  // use file...

  // if (someCondition()) {
  //   // do some more work...
  //   return;
  // }

  // ...
}

