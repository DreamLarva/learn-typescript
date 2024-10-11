{
  type IsParameter<Part> = Part extends `[${infer ParamName}]`
    ? ParamName
    : never;
  type FilteredParts<Path> = Path extends `${infer PartA}/${infer PartB}`
    ? IsParameter<PartA> | FilteredParts<PartB>
    : IsParameter<Path>;
  type ParamValue<Key> = Key extends `...${infer Anything}` ? string[] : number;
  type RemovePrefixDots<Key> = Key extends `...${infer Name}` ? Name : Key;
  type Params<Path> = {
    [Key in FilteredParts<Path> as RemovePrefixDots<Key>]: ParamValue<Key>;
  };
  type CallbackFn<Path> = (req: { params: Params<Path> }) => void;

  function get<Path extends string>(path: Path, callback: CallbackFn<Path>) {
    // TODO: implement
  }
}

{
  type PathSegments<Path extends string> =
    Path extends `${infer SegmentA}/${infer SegmentB}`
      ? ParamOnly<SegmentA> | PathSegments<SegmentB>
      : ParamOnly<Path>;
  type ParamOnly<Segment extends string> = Segment extends `:${infer Param}`
    ? Param
    : never;
  type RouteParams<Path extends string> = {
    [Key in PathSegments<Path>]: string;
  };

  type A = RouteParams<"/a/b/c">;
  type B = RouteParams<"/a/b/:c">;
  type C = RouteParams<"/a/b/:c/:d">;
  type D = RouteParams<"a/b/:c/:d">;
}
