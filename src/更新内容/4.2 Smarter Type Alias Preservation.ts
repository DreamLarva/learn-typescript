export type BasicPrimitive = number | string | boolean;


/**
 * doStuff 的返回值的类型 显示为 BasicPrimitive | undefined
 * 而不是 number | string | boolean | undefined
 * 现在会劲量保留 联合类型 中的各个类型 , 而不是展开
 * 这样对不会直接展开某些超级复杂的类型, 而导致可读性下降
 * */
export function doStuff(value: BasicPrimitive) {
  if (Math.random() < 0.5) {
    return undefined;
  }

  return value;
}
