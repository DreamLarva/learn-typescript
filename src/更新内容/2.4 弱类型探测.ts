/**
 * TypeScript 2.4引入了“弱类型”的概念。 任何只包含了可选属性的类型被当作是“weak”。
 *
 * 弱类型 作为参数时 兼容的类型至少得有一个成员兼容
 * 从逻辑上也是通的 你传一个 一个成员都不兼容的 对象 进来 就和 传 一个 空对象{} 一样
 *
 * 解决的办法:
 *      1.确定属性存在时再声明
 *      2.给弱类型增加索引签名（比如 [propName: string]: {}）
 *      3.使用类型断言（比如opts as Options）
 * */
{
  interface Options {
    data?: string;
    timeout?: number;
    maxRetries?: number;
  }

  function sendMessage(options: Options) {
    // ...
  }

  const opts = {
    payload: "hello world!",
    retryOnFail: true,
  };

  sendMessage({ data: "1" });
  sendMessage({});
  // sendMessage(opts); // error  'opts' 和 'Options' 没有重叠的属性
  // 可能我们想要用'data'/'maxRetries'来代替'payload'/'retryOnFail'
}

{
  type MyType =
    | string
    | {
        b: { b: number };
        StartType?: string;
        StartContext?: string;
        StartDate?: string;
        StartFalg?: string;
      }
    | {
        a: { a: number };
        EndType?: string;
        EndContext?: string;
        EndDate?: string;
        EndFalg?: string;
      };

  const x: MyType = {
    // OK
    StartDate: "1",
    a: { a: 1 },
  };
}

{
  type MyType =
    | {
        b: { b: number };
      }
    | {
        a: { a: number };
      };

  const x: MyType = {
    // OK
    b: { b: 1 },
    a: { a: 1 },
  };

  console.log(x);
}

{
  class A {
    a?: number;
  }

  class B {
    b?: string;
  }

  class E {
    a: number = 1;
    b: string = "2";
  }

  const e: A | B = { a: 1, b: "2" };
  const f: E = { a: 1, b: "2" };

  function D(p: A | B) {}

  D(e);
  D(f);
}
{
  type A = {
    a: "1";
    b?: number;
  };
  type B = {
    a: "2";
    c?: string;
  };

  // Error
  // const C: A | B = {
  //   a: "2",
  //   b: 1,
  // };

}

export {};

