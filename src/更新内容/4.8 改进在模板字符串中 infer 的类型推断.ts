// Grabs the first element of a tuple if it's assignable to 'number',
// and returns 'never' if it can't find one.
type TryGetNumberIfFirst<T> =
  T extends [infer U extends number, ...unknown[]] ? U : never;

// SomeNum used to be 'number'; now it's '100'.
type SomeNum = "100" extends `${infer U extends number}` ? U : never;

// SomeBigInt used to be 'bigint'; now it's '100n'.
type SomeBigInt = "100" extends `${infer U extends bigint}` ? U : never;

// SomeBool used to be 'boolean'; now it's 'true'.
type SomeBool = "true" extends `${infer U extends boolean}` ? U : never;


// JustNumber is `number` here because TypeScript parses out `"1.0"`, but `String(Number("1.0"))` is `"1"` and doesn't match.
type JustNumber = "1.0" extends `${infer T extends number}` ? T : never;

// Improved Inference for infer Types in Template String Types
