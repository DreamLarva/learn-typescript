/**
 * ts 检查更加精细
 * 减少错误
 * */

// if (/0x[0-9a-f]/) {
//  ~~~~~~~~~~~~
// error: This kind of expression is always truthy.
// }

// if (x => 0) {
//  ~~~~~~
// error: This kind of expression is always truthy.
// }

// function isValid(value: string | number, options: any, strictness: "strict" | "loose") {
//   if (strictness === "loose") {
//     value = +value
//   }
//   return value < options.max ?? 100;
//   //     ~~~~~~~~~~~~~~~~~~~
//   // error: Right operand of ?? is unreachable because the left operand is never nullish.
// }

declare const primaryValue:number;
declare const secondaryValue:number;
// if (
//   isValid(primaryValue, "strict") || isValid(secondaryValue, "strict") ||
//   isValid(primaryValue, "loose" || isValid(secondaryValue, "loose"))
// ) {
//   //                    ~~~~~~~
//   // error: This kind of expression is always truthy.
// }
