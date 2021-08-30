/**
 * --exactOptionalPropertyTypes
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


  const p: Person = {
    name: "Daniel",
    // age: undefined, // error
  };
}
