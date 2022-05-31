/*
改进在 对象和方法中的 函数推理

ts会延迟推断类型 T 中间有一个类型确定就确定 所有链路上的T
* */
declare function f<T>(arg: {
  produce: (n: string) => T;
  consume: (x: T) => void;
}): void;

// Works
f({
  produce: () => "hello",
  consume: (x) => x.toLowerCase(),
});

// Works
f({
  produce: (n: string) => n,
  consume: (x) => x.toLowerCase(),
});

// Was an error, now works.
f({
  produce: (n) => n,
  consume: (x) => x.toLowerCase(),
});

// Was an error, now works.
f({
  produce: function () {
    return "hello";
  },
  consume: (x) => x.toLowerCase(),
});

// Was an error, now works.
f({
  produce() {
    return "hello";
  },
  consume: (x) => x.toLowerCase(),
});

export {};
