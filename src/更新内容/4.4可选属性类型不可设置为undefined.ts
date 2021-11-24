/**
 * --exactOptionalPropertyTypes
 * 未赋值的导致的 undefined 和 字面量赋值的 undefined 视为不同的类型
 * */

{
  interface Person {
    name: string;
    age?: number;
  }

  // 之前版本 没有 --exactOptionalPropertyTypes 参数时
  // interface Person {
  //   name: string,
  //   age?: number | undefined;
  // }


  // 不能 直接设置值为 undefined
  const p: Person = {
    name: "Daniel",
    // age: undefined, // error
  };
}
{
  interface Person {
    name: string;
    age?: number | undefined; // 有 undefined 类型 才能赋值 undefined
  }


  const p: Person = {
    name: "Daniel",
    age: undefined,
  };


}






export {}
