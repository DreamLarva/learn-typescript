
type A = number;
// ✅ fine - no labels
type Pair1 = [A, A];

// ✅ fine - all fully labeled
type Pair2 = [first: A, second: A];


// ❌ previously an error
type Pair3 = [first: A, A];
//                         ~
// Tuple members must all have names
// or all not have names.


// ❌ previously an error
type TwoOrMore_A = [first: A, second: A, ...A[]];
//                                          ~~~~~~
// Tuple members must all have names
// or all not have names.

// ✅
// type TwoOrMore_B = [first: A, second: A, rest: ...A[]]; // 官方这么写是错的

type TwoOrMore_B = [first: A, second: A, ...rest: A[]];

type HasLabels = [a: string, b: string];
type HasNoLabels = [number, number];
type Merged = [...HasNoLabels, ...HasLabels];
//   ^ [number, number, string, string]
//
//     'a' and 'b' were lost in 'Merged'



declare let array: string[] | number[];

array.filter(x => !!x);
