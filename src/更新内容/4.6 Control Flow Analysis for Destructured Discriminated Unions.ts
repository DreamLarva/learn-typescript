/*
在流控制中 联合类型 解构
When destructuring individual properties into a const declaration,
or when destructuring a parameter into variables that are never assigned to,
TypeScript will check for if the destructured type is a discriminated union.
If it is, TypeScript can now narrow the types of variables depending on checks
of other variables So in our example, a check on kind narrows the type of payload.

当截个单个属性 到一个const 中或者 解构到一个不会再更改的变量中
ts就会检查 这个属性的类型来, 确定类型
* */
type Action =
  | { kind: "NumberContents"; payload: number }
  | { kind: "StringContents"; payload: string };

function processAction(action: Action) {
  if (action.kind === "NumberContents") {
    // `action.payload` is a number here.
    let num = action.payload * 2;
    // ...
  } else if (action.kind === "StringContents") {
    // `action.payload` is a string here.
    const str = action.payload.trim();
    // ...
  }
}

function processAction2(action: Action) {
  const kind = action.kind;
  if (kind === "NumberContents") {
    // `action.payload` is a number here.
    let num = action.payload * 2;
    // ...
  } else if (kind === "StringContents") {
    // `action.payload` is a string here.
    const str = action.payload.trim();
    // ...
  }
}

