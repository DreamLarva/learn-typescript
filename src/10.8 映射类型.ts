/** 映射类型 */

{
  /** 一个常见的人就是将一个已知的类型属性变为可选的*/
  interface PersonPartial {
    name?: string;
    age?: number;
  }

  /** 只读版本 */
  interface PersonReadOnly {
    readonly name: string;
    readonly age: number;
  }

  /**
   * 旧类型中创建新类型的一种方式 — 映射类型
   * 在映射类型里，新类型以相同的形式去转换旧类型里每个属性。
   * 你可以令每个属性成为 readonly类型或可选的。
   * */
  type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
  };
  type Partial<T> = {
    [P in keyof T]?: T[P];
  };

  interface Person {
    name: string;
    age: number;
  }

  type PersonPartial1 = Partial<Person>;
  type ReadonlyPerson1 = Readonly<Person>;
}

{
  /**
   * 它的语法与索引签名的语法类型，内部使用了 for .. in。 具有三个部分：
   * 1.类型变量 K，它会依次绑定到每个属性。
   * 2.字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
   * 3.属性的结果类型。
   * */
  /**
   * P in T 关键字之后 T应该是一个 string[]  类型
   * P keys of T 关键字 keys of 返回的是 T中所有属性的所以 类型为 string[]
   * */
  type Keys = "option1" | "option2";
  /** 注意此处并没有 keyof */
  type Flags = { [K in Keys]: boolean };
  // 等同于
  /*type Flags = {
        option1: boolean;
        option2: boolean;
    }*/

  let a: Flags = {
    option1: true,
    option2: true,
  };

  interface Person {
    name: string;
    age: number;
  }

  type NullablePerson = {
    [P in keyof Person]: Person[P] | null;
  };
  type PartialPerson = {
    [P in keyof Person]?: Person[P];
  };

  /** 更加通用的版本 */
  type Nullable<T> = { [P in keyof T]: T[P] | null };
  type Partial<T> = { [P in keyof T]?: T[P] };
  /**
   * 在这些例子里，属性列表是 keyof T且结果类型是 T[P]的变体。
   * 这是使用通用映射类型的一个好模版。 因为这类转换是 同态的，映射只作用于 T的属性而没有其它的。
   * 编译器知道在添加任何新属性之前可以拷贝所有存在的属性修饰符。
   * 例如，假设 Person.name是只读的，那么 Partial<Person>.name也将是只读的且为可选的。
   * */
}
{
  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };
  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  };

  /**
   * 相当于给 参数o 每个都对应get 和set 方法
   * */
  function proxify<T, P extends keyof T>(o: T): Proxify<T> {
    let p = {};
    Object.keys((key: P) => {
      Object.assign(p, {
        get(): T[P] {
          return o[key];
        },
        set(): void {},
      });
    });

    return p as Proxify<T>;
  }

  let proxyProps = proxify({ a: 1 });
}
{
  /**
   * 注意 Readonly<T>和 Partial<T>用处不小，因此它们与 Pick和 Record一同被包含进了TypeScript的标准库里
   * */
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };
  type Record<K extends string, T> = {
    [P in K]: T;
  };
  /**
   * Readonly， Partial和 Pick是同态的，但 Record不是。 因为 Record并不需要输入类型来拷贝属性，所以它不属于同态
   * */
  type ThreeStringProps = Record<"prop1" | "prop2" | "prop3", string>;
}
/** 由映射类型进行推断 */
{
  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };
  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  };

  function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
      result[k] = t[k].get();
    }
    return result;
  }

  let originalProps = unproxify({});
}

export {};
