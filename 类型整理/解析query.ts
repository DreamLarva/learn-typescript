// https://my.oschina.net/u/5079097/blog/5444753
type ParseParam<Param extends string> =
  Param extends `${infer Key}=${infer Value}`
    ? {
        [K in Key]: Value;
      }
    : {};

type MergeValues<One, Other> = One extends Other
  ? One
  : Other extends unknown[]
  ? [One, ...Other]
  : [One, Other];

type MergeParams<OneParam extends object, OtherParam extends object> = {
  [Key in keyof OneParam | keyof OtherParam]: Key extends keyof OneParam
    ? Key extends keyof OtherParam
      ? MergeValues<OneParam[Key], OtherParam[Key]>
      : OneParam[Key]
    : Key extends keyof OtherParam
    ? OtherParam[Key]
    : never;
};

type ParseQueryString<Str extends string> =
  Str extends `${infer Param}&${infer Rest}`
    ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
    : ParseParam<Str>;

type ParseQueryStringResult = ParseQueryString<"a=1&a=2&b=2&c=3&a=4">;
