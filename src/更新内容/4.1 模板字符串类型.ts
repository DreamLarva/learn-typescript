{
  type World = "world";

  type Greeting = `hello ${World}`;
// same as
//   type Greeting = "hello world";
}

{
  type Color = "red" | "blue";
  type Quantity = "one" | "two";

  type SeussFish = `${Quantity | Color} fish`;
// same as
//   type SeussFish = "one fish" | "two fish"
//                  | "red fish" | "blue fish";
}

{
  type VerticalAlignment = "top" | "middle" | "bottom";
  type HorizontalAlignment = "left" | "center" | "right";

// Takes
//   | "top-left"    | "top-center"    | "top-right"
//   | "middle-left" | "middle-center" | "middle-right"
//   | "bottom-left" | "bottom-center" | "bottom-right"
  function setAlignment(value: `${VerticalAlignment}-${HorizontalAlignment}`): void {
  }

  setAlignment("top-left");   // works!
  // setAlignment("top-middel"); // error!
  // setAlignment("top-pot");    // error! but good doughnuts if you're ever in Seattle
}

/**
 * 状态机 用到很多
 * 需要给进入状态 和 出状态 的事件有 额外的标识
 * */
// 给对于 T 中每一个属性名 有一个对应的事件名
type PropEventSource<T> = {
  on<K extends string & keyof T>
  (eventName: `${K}Changed`, callback: (newValue: T[K]) => void): void;
};

declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>;

let person = makeWatchedObject({
  firstName: "Homer",
  age: 42,
  location: "Springfield",
});


// works! 'newName' is typed as 'string'
person.on("firstNameChanged", newName => {
  // 'newName' has the type of 'firstName'
  console.log(`new name is ${newName.toUpperCase()}`);
});


// works! 'newAge' is typed as 'number'
person.on("ageChanged", newAge => {
  if (newAge < 0) {
    console.log("warning! negative age");
  }
})

/**
 * 新增的 加工字符串的类型
 * */
{
  type EnthusiasticGreeting<T extends string> = `${Uppercase<T>}`

  type HELLO = EnthusiasticGreeting<"hello">;
  // same as
  //   type HELLO = "HELLO";

}

/**
 * 详细设计
 * */

/**
 * 1联合类型 在template literal 占位符中(${xx}) 也是遵循笛卡尔积
 * 例 :
 * `[${A|B|C}]` 解析为 `[${A}]` | `[${B}]` | `[${C}]`.
 * `[${A|B},${C|D}]` 解析为 `[${A},${C}]` | `[${A},${D}]` | `[${B},${C}]` | `[${B},${D}]`.
 *
 * 字符串,数字,布尔值,bigint的字面量类型 在占位符中,会自动替换为对应的字面量类型
 * 例 :
 * `[${'abc'}]` resolves to `[abc]` and `[${42}]` 解析为 `[42]`.
 *
 * 位符中任何类型的any，string，number，boolean或bigint都会令模板字符串类型 解析为string类型。
 *
 * 在占位符中的 never 会令template literal 解析为 never
 * */

{

  type EventName<T extends string> = `${T}Changed`;
  type Concat<S1 extends string, S2 extends string> = `${S1}${S2}`;
  type ToString<T extends string | number | boolean | bigint> = `${T}`;
  type T0 = EventName<'foo'>;  // 'fooChanged'
  type T1 = EventName<'foo' | 'bar' | 'baz'>;  // 'fooChanged' | 'barChanged' | 'bazChanged'
  type T2 = Concat<'Hello', 'World'>;  // 'HelloWorld'
  type T3 = `${'top' | 'bottom'}-${'left' | 'right'}`;  // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  type T4 = ToString<'abc' | 42 | true | -1234n>;  // 'abc' | '42' | 'true' | '-1234'
}

/**
 * 超过 100,000 笛卡尔积的结果的模板字符串类型会直接报错
 * */
{
  type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  // type Zip = `${Digit}${Digit}${Digit}${Digit}${Digit}`;  // Error
}

/**
 * 大小写转换的 类型为  intrinsic string types (内部类型)
 * */
{
  type GetterName<T extends string> = `get${Capitalize<T>}`;
  type Cases<T extends string> = `${Uppercase<T>} ${Lowercase<T>} ${Capitalize<T>} ${Uncapitalize<T>}`;
  type T10 = GetterName<'foo'>;  // 'getFoo'
  type T11 = Cases<'bar'>;  // 'BAR bar Bar bar'
  type T12 = Cases<'BAR'>;  // 'BAR bar BAR bAR'
}

/**
 * template literal types 是 string 的子类型 , 且都可以分配给 string 类型
 * 此外 template literal type `${T}` 是 template literal type `${C}` 的子类型,
 * 且可分配给 template literal type `${C}`, C 是 string literal type 由 T 约束
 * */
{
  function test<T extends 'foo' | 'bar'>(name: `get${Capitalize<T>}`) {
    let s1: string = name; // template literal type 分配给 string
    let s2: 'getFoo' | 'getBar' = name; // template literal type 分配给 string 联合类型
  }
}

/**
 * template literal types 同样支持 推理
 * 推理的时候 字面量必须完全符合 源类型
 * Inference proceeds by matching each placeholder to a substring in the source from left to right:
 * A placeholder followed by a literal character span is matched by inferring zero or more characters from the
 * source until the first occurrence of that literal character span in the source.
 * */
{
  type MatchPair<S extends string> = S extends `[${infer A},${infer B}]` ? [A, B] : unknown;

  type T20 = MatchPair<'[1,2]'>;  // ['1', '2']
  type T21 = MatchPair<'[foo,bar]'>;  // ['foo', 'bar']
  type T22 = MatchPair<' [1,2]'>;  // unknown
  type T23 = MatchPair<'[123]'>;  // unknown
  type T24 = MatchPair<'[1,2,3,4]'>;  // ['1', '2,3,4'] // 贪婪匹配

  type FirstTwoAndRest<S extends string> = S extends `${infer A}${infer B}${infer R}` ? [`${A}${B}`, R] : unknown;

  type T25 = FirstTwoAndRest<'abcde'>;  // ['ab', 'cde']  // 贪婪匹配
  type T26 = FirstTwoAndRest<'ab'>;  // ['ab', '']
  type T27 = FirstTwoAndRest<'a'>;  // unknown
}

/**
 * Template literal types 可以结合 递归条件类型 来写 类似 Join 和 Split 的类型
 * */
{
  type Join<T extends unknown[], D extends string> =
    T extends [] ? '' :
      T extends [string | number | boolean | bigint] ? `${T[0]}` :
        T extends [string | number | boolean | bigint, ...infer U] ? `${T[0]}${D}${Join<U, D>}` :
          string;
  type T30 = Join<[1, 2, 3, 4], '.'>;  // '1.2.3.4'
  type T31 = Join<['foo', 'bar', 'baz'], '-'>;  // 'foo-bar-baz'
  type T32 = Join<[], '.'>;  // ''


  type Split<S extends string, D extends string> =
    string extends S ? string[] :
      S extends '' ? [] :
        S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] :
          [S];

  type T40 = Split<'foo', '.'>;  // ['foo']
  type T41 = Split<'foo.bar.baz', '.'>;  // ['foo', 'bar', 'baz']
  type T42 = Split<'foo.bar', ''>;  // ['f', 'o', 'o', '.', 'b', 'a', 'r']
  type T43 = Split<any, '.'>;  // string[]
}

/**
 * The recursive inference capabilities can for example be used to strongly type functions that access properties using "dotted paths", and pattern that is sometimes used in JavaScript frameworks.
 * lodash get,at 等方法 终于有约束了
 * */
type PropType<T, Path extends string> =
  string extends Path ? unknown :
    Path extends keyof T ? T[Path] :
      Path extends `${infer K}.${infer R}` ? K extends keyof T ? PropType<T[K], R> : unknown :
        unknown;

declare function getPropValue<T, P extends string>(obj: T, path: P): PropType<T, P>;
declare const s: string;
{

  const obj = {a: {b: {c: 42, d: 'hello'}}};
  const a = getPropValue(obj, 'a');  // { b: {c: number, d: string } }
  const b = getPropValue(obj, 'a.b');  // {c: number, d: string }
  const c = getPropValue(obj, 'a.b.d');  // string
  const d = getPropValue(obj, 'a.b.x');  // unknown
  const e = getPropValue(obj, s);  // unknown
}


export {}
