var _a, _b, _c, _d;
let foo;
let bar;
let defaultValue;
let element;
let otherElement;
/**
 * You can think of this feature - the ?? operator - as a way to “fall back” to a default value when dealing with null or undefined. When we write code like
 * 可以认为 ?? 操作符 是 在处理 null 或 undefined 回退到默认值的方法
 * ?? 操作符 同样只受到  undefined 和 null 的影响 而不受其他 falsy value 的影响
 * */
{
  let x = foo !== null && foo !== void 0 ? foo : bar();
  // 翻译后
  // let x = (foo !== null && foo !== undefined) ?
  //     foo :
  //     bar();
  // 当然也可以多个
  let y =
    (_a = foo !== null && foo !== void 0 ? foo : bar()) !== null &&
    _a !== void 0
      ? _a
      : bar();
  // foo? foo.bar : defaultValue
  // foo?.bar || defaultValue
  x =
    (_b = foo === null || foo === void 0 ? void 0 : foo.bar) !== null &&
    _b !== void 0
      ? _b
      : defaultValue;
  // if (foo.length > 3) {
  //     foo[2]
  // }
  x = foo === null || foo === void 0 ? void 0 : foo[2];
  // let match = "#C0FFEE".match(/#([A-Z]+)/i);
  // let hex = match && match[1];
  // let hex = ("#C0FFEE".match(/#([A-Z]+)/i) || [,])[1];
  let hex =
    (_c = "#C0FFEE".match(/#([A-Z]+)/i)) === null || _c === void 0
      ? void 0
      : _c[1];
  // if (element.prepend) element.prepend(otherElement);
  (_d = element.prepend) === null || _d === void 0
    ? void 0
    : _d.call(element, otherElement);
}
export {};
//# sourceMappingURL=3.7  空值合并 Nullish Coalescing.js.map
