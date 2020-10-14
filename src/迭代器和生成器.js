/**
 * 当一个对象实现了Symbol.iterator属性时，我们认为它是可迭代的。 一些内置的类型如
 * Array，Map，Set，String，Int32Array，Uint32Array等
 * 都已经实现了各自的Symbol.iterator。 对象上的 Symbol.iterator函数负责返回供迭代的值。
 * */
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __await =
  (this && this.__await) ||
  function (v) {
    return this instanceof __await ? ((this.v = v), this) : new __await(v);
  };
var __asyncValues =
  (this && this.__asyncValues) ||
  function (o) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator],
      i;
    return m
      ? m.call(o)
      : ((o =
          typeof __values === "function" ? __values(o) : o[Symbol.iterator]()),
        (i = {}),
        verb("next"),
        verb("throw"),
        verb("return"),
        (i[Symbol.asyncIterator] = function () {
          return this;
        }),
        i);
    function verb(n) {
      i[n] =
        o[n] &&
        function (v) {
          return new Promise(function (resolve, reject) {
            (v = o[n](v)), settle(resolve, reject, v.done, v.value);
          });
        };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function (v) {
        resolve({ value: v, done: d });
      }, reject);
    }
  };
var __asyncDelegator =
  (this && this.__asyncDelegator) ||
  function (o) {
    var i, p;
    return (
      (i = {}),
      verb("next"),
      verb("throw", function (e) {
        throw e;
      }),
      verb("return"),
      (i[Symbol.iterator] = function () {
        return this;
      }),
      i
    );
    function verb(n, f) {
      i[n] = o[n]
        ? function (v) {
            return (p = !p)
              ? { value: __await(o[n](v)), done: n === "return" }
              : f
              ? f(v)
              : v;
          }
        : f;
    }
  };
var __asyncGenerator =
  (this && this.__asyncGenerator) ||
  function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
    return (
      (i = {}),
      verb("next"),
      verb("throw"),
      verb("return"),
      (i[Symbol.asyncIterator] = function () {
        return this;
      }),
      i
    );
    function verb(n) {
      if (g[n])
        i[n] = function (v) {
          return new Promise(function (a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await
        ? Promise.resolve(r.value.v).then(fulfill, reject)
        : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
    }
  };
/**
 * for..of 语句
 * for..of会遍历可迭代的对象，调用对象上的Symbol.iterator方法。 下面是在数组上使用 for..of的简单例子：
 * */
{
  let someArray = [1, "string", false];
  for (let entry of someArray) {
    console.log(entry); // number | string | boolean
  }
}
/**
 * for..of vs. for..in 语句
 * for..of和for..in均可迭代一个列表；但是用于迭代的值却不同，for..in迭代的是对象的 键 的列表，而for..of则迭代对象的键对应的值。
 * */
{
  let list = [4, 5, 6];
  for (let i in list) {
    console.log(i); // i:string
  }
  for (let i of list) {
    console.log(i); // i:number
  }
}
/**
 * 另一个区别是for..in可以操作任何对象；它提供了查看对象属性的一种方法。 但是 for..of关注于迭代对象的值。
 * 内置对象Map和Set已经实现了Symbol.iterator方法，让我们可以访问它们保存的值。
 * */
{
  let pets = new Set(["Cat", "Dog", "Hamster"]);
  // (pets)["species"] = "mammals"; // 这里报错 不能够这样赋值 因为 Set 类型里面没有 索引类型的声明
  for (let pet in pets) {
    console.log(pet); // "species"
  }
  for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
  }
}
/**
 * 生成器返回的是 必须是
 * IterableIterator<T>类型
 * 且泛型T 必须包含所有yield 后可能返回的类型
 * */
{
  function* A1() {
    yield "string";
    yield 1;
  }
  for (const a of A1()) {
    // a 被推断为 number | string
  }
  function* A2() {
    yield true;
    yield 1;
  }
  for (const a of A2()) {
    // 说明 迭代器 推断都是联合类型
    // a 被推断为  true | 1
  }
  function* A3() {
    yield* A1();
    yield* A2();
  }
  for (const a of A3()) {
    // a 被推断为 number | string | true | 1
  }
  function* B1() {
    while (true) {
      yield 1;
      yield Promise.resolve(1);
    }
  }
  function* B2() {
    while (true) {
      yield* A3();
      yield Promise.resolve(1);
    }
  }
  for (const a of B2()) {
    // a 被推断为 number | string | true | 1 | Promise<1>
  }
}
/**
 * 异步生成器
 * */
{
  function sleep(time) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve) => setTimeout(resolve, time));
    });
  }
  // 返回值 推断为 AsyncIterableIterator<1 | number | 4>
  function g() {
    return __asyncGenerator(this, arguments, function* g_1() {
      yield yield __await(1);
      yield __await(sleep(100));
      yield __await(yield* __asyncDelegator(__asyncValues([2, 3]))); // 此处推断 出 number
      yield __await(
        // 此处推断 出 number
        yield* __asyncDelegator(
          __asyncValues(
            (function () {
              return __asyncGenerator(this, arguments, function* () {
                yield __await(sleep(100));
                yield yield __await(4);
              });
            })()
          )
        )
      );
    });
  }
  function main() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
      try {
        // for-await-of语句 进行 迭代
        for (
          var _b = __asyncValues(g()), _c;
          (_c = yield _b.next()), !_c.done;

        ) {
          const a = _c.value;
          // a 推断为 1 | number | 4
          console.log(a);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    });
  }
  main();
}
export {};
//# sourceMappingURL=迭代器和生成器.js.map
