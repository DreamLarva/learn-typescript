import type {SomeThing} from "./some-module";

// 不能 export default type 当然也不能直接 import type 的内容
// import type Foo, { Bar, Baz } from "some-module"; // TS1363: A type-only import can specify a default import or named bindings, but not both


export type {SomeThing};
