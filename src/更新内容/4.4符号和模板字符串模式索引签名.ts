interface BooleanDictionary {
  [key: string]: boolean;
}

declare let myDict: BooleanDictionary;

// Valid to assign boolean values
myDict["foo"] = true;
myDict["bar"] = false;

// Error, "oops" isn't a boolean
// myDict["baz"] = "oops";

{
  // This is part of TypeScript's definition of the built-in Array type.
  interface Array<T> {
    [index: number]: T;

    // ...
  }

  let arr = new Array<string>();

  // Valid
  arr[0] = "hello!";

  // Error, expecting a 'string' value here
  // arr[1] = 123;
}

{
  interface Colors {
    [sym: symbol]: number;
  }

  const red = Symbol("red");
  const green = Symbol("green");
  const blue = Symbol("blue");

  let colors: Colors = {};

  colors[red] = 255; // Assignment of a number is allowed
  let redVal = colors[red]; // 'redVal' has the type 'number'

  // colors[blue] = "da ba dee"; // Error: Type 'string' is not assignable to type 'number'.
}

// 使用 模板字符串 作key
{
  interface Options {
    width?: number;
    height?: number;
  }

  let a: Options = {
    width: 100,
    height: 100,
    // "data-blah": true, // Error! 'data-blah' wasn't declared in 'Options'.
  };

  interface OptionsWithDataProps extends Options {
    // Permit any property starting with 'data-'.
    [optName: `data-${string}`]: unknown;
  }

  let b: OptionsWithDataProps = {
    width: 100,
    height: 100,
    "data-blah": true, // Works!

    // "unknown-property": true,  // Error! 'unknown-property' wasn't declared in 'OptionsWithDataProps'.
  };
}

{
  interface Data1 {
    [optName: string | symbol]: any;
  }

  // 等同于

  interface Data2 {
    [optName: string]: any;

    [optName: symbol]: any;
  }
}
