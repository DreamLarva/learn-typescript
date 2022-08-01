type NestedStringArray = Array<string | NestedStringArray>;
type SkipSpace<Str extends string> = Str extends ` ${infer Str}` ? SkipSpace<Str> : Str;

type ParseStr<Str extends string> =
  Str extends `"${infer Value}"${infer Remaining}`
    ? [SkipSpace<Remaining>, Value]
    : [Str, undefined];

type ParseItem<Str extends string> =
  ParseStr<Str> extends [infer Remaining, infer Value]
    ? Value extends string
      ? [Remaining, Value]
      : ParseStringArray<Str> extends [infer Remaining, infer Value]
        ? Value extends NestedStringArray
          ? [Remaining, Value]
          : [Remaining, undefined]
        : [Remaining, undefined]
    : [Str, undefined];

type ParseItems<Str extends string, Result extends NestedStringArray> =
  ParseItem<Str> extends [infer Remaining, infer Value]
    ? Value extends NestedStringArray[0]
      ? Remaining extends `,${infer Remaining}`
        ? ParseItems<SkipSpace<Remaining>, [...Result, Value]>
        : [Remaining, [...Result, Value]]
      : [Remaining, Result]
    : [Str, undefined]

type ParseStringArray<Str extends string, Result extends NestedStringArray = []> =
  Str extends `[${infer Str}`
    ? ParseItems<SkipSpace<Str>, Result> extends [infer Remaining, infer Result]
      ? Remaining extends `]${infer Remaining}`
        ? [Remaining, Result]
        : [Remaining, undefined]
      : [Str, undefined]
    : [Str, undefined];
type Parse<Str extends string> =
  ParseStringArray<Str> extends [infer Remaining, infer Result]
    ? Remaining extends ''
      ? Result
      : never
    : never;

type EmptyArray = Parse<'[]'>;
//   ^? []
type EmptyArray2 = Parse<'[""]'>;
//   ^? [""]
type StringArray = Parse<'["hello", "world"]'>
//   ^? ["hello", "world"]
type NestedArray = Parse<'["hello", ["world", "ts", ["!"]], ["try this"]]'>
//   ^? ["hello", ["world", "ts", ["!"]], ["try this"]]
