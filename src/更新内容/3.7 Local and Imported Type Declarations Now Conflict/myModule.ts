// ./myModule.ts
// import { SomeType } from "./someOtherModule"; // error
export interface SomeType {
    x: number;
}

/**
 * 现在引入的 interface 不再与本地的 interface 合并
 * */

function fn(arg: SomeType) {
    // console.log(arg.x); // Error! 'x' doesn't exist on 'SomeType'
}
