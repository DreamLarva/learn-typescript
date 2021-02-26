{
  // 元素包含 1或2个 string
  let c: [string, string?] = ["hello"];
  c = ["hello", "world"];

  // A labeled tuple that has either one or two strings.
  // 含有标签的元组 包含1到2个 string
  let d: [first: string, second?: string] = ["hello"];
  d = ["hello", "world"];

  // 元组包含 一个展开元素,并且在开头有 2 个string
  // 任意数量 boolean 在尾部
  let e: [string, string, ...boolean[]];

  e = ["hello", "world"];
  e = ["hello", "world", false];
  e = ["hello", "world", true, false, true];
}
/**
 * 4.2 版本 展开的元素可以处在 元组的任意位置
 * */
{
  let foo: [...string[], number];

  foo = [123];
  foo = ["hello", 123];
  foo = ["hello!", "hello!", "hello!", 123];

  let bar: [boolean, ...string[], boolean];

  bar = [true, false];
  bar = [true, "some text", false];
  bar = [true, "some", "separated", "text", false];
}
/**
 * 只能有一个 展开元素, 且在它之后 不能有可选元素
 * */
{
  interface Clown {
    /*...*/
  }
  interface Joker {
    /*...*/
  }

  // 只能有一个 rest 元素
  // let StealersWheel: [...Clown[], "me", ...Joker[]];
  //                                    ~~~~~~~~~~ Error!
  // A rest element cannot follow another rest element.

  // 紧随的不能使 可选元素
  // let StringsAndMaybeBoolean: [...string[], boolean?];
  //                                        ~~~~~~~~ Error!
  // An optional element cannot follow a rest element.
}
/**
 * 这些不可跟踪的rest元素可用于对采用任意数量的前导参数，后跟一些固定参数的函数进行建模。
 * */
declare function doStuff(...args: [...names: string[], shouldCapitalize: boolean]): void;

doStuff(/*shouldCapitalize:*/ false)
doStuff("fee", "fi", "fo", "fum", /*shouldCapitalize:*/ true);

/**
 * Even though JavaScript doesn’t have any syntax to model leading rest parameters,
 * we were still able to declare doStuff as a function that takes leading arguments by declaring the ...args rest parameter with a tuple type that uses a leading rest element.
 * This can help model lots of existing JavaScript out there!
 *
 * 尽管js 没有前置 rest 参数的语法
 * 但是我们任然可以 用参数元组类型的 来声明 前置rest 元素的类型
 * */
