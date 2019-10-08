"use strict";
/**
 * TypeScript 2.9允许传入泛型参数到标记模版字符串。
 * */
/*
declare function styledComponent<Props>(strs: TemplateStringsArray): Component<Props>;

interface MyProps {
    name: string;
    age: number;
}

// MyProps 时候是 react 组件的props 的类型
styledComponent<MyProps> `
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`;

* */
// inference fails because 'number' and 'string' are both candidates that conflict
let a = tag `${100} ${"hello"}`;
// let b = tag<string | number> `${true}`; // error
//# sourceMappingURL=2.9 泛型标记模版里的泛型参数.js.map