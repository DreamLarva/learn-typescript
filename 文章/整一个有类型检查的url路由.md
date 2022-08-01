# Extract parameter types from string literal types with TypeScript | Tan Li Hau

URL: https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/
tags: Typescript
已读: Yes
来源: Blog
添加日期: August 1, 2022 1:47 PM

## ****The Challenge****

First of all, here's a TypeScript challenge for you:

Can you figure how to define the TypeScript type for the `app.get` method below?

```tsx
app.get('/purchase/[shopid]/[itemid]/args/[...args]', (req) => {
	const { params } = req;
           
//const params: {
//    shopid: number;
//    itemid: number;
//    args: string[];
//}
});
app.get('/docs/[chapter]/[section]', (req) => {
	const { params } = req;
           
//const params: {
//    chapter: number;
//    section: number;
//}
});
```

*Try and hover the variables to look at their types.*

*Notice that `...args` is a string array instead of number* 🤯

The `req.params` is derived from the string passed in as the 1st parameter.

This is useful when you want to define types for a routing-like function, where you can pass in a route with path pattern that you can define dynamic segments with custom syntax (eg: `[shopid]` or `:shopid`), and a callback function, where the argument type is derived from the route that you just passed in.

So if you try to access parameter that is not defined, you get an error!

```tsx
app.get('/purchase/[shopid]/[itemid]/args/[...args]', (req) => {
	const { foo } = req.params;
//Property 'foo' does not exist on type '{ shopid: number; itemid: number; args: string[]; }'.
});
```

A real-world use-case for this, if you are more familiar with [React Router](https://v5.reactrouter.com/), is to derive the type for `routeProps` in the [render](https://v5.reactrouter.com/web/api/Route/render-func) function from the `path` props:

```tsx
<Route
	path="/user/:username"
	render={(routeProps) => {
		const params = routeProps.match.params;
          
//const params: {
//    username: string;
//}
	}}
/>;
```

In this article, we are going to explore how to define such a type, through various TypeScript techniques, extracting types from a string literal type.

## ****Things you need to know****

First thing first, let's talk through some basic knowledges required before we go on and tackle the problem.

### ****String Literal Type****

Type `string` in TypeScript is a string that can have any value:

```tsx
let str: string = 'abc';
str = 'def'; // no errors, string type can have any value
```

However, a [string literal type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types), is a string type with a specific value:

```tsx
let str: 'abc' = 'abc';
str = 'def';
// error Type '"def"' is not assignable to type '"abc"'.
```

Most of the time, we use this alongside with [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) to determine a list of string values you can pass to a function / array / object:

```tsx
function eatSomething(food: 'sushi' | 'ramen') {}
eatSomething('sushi');
eatSomething('ramen');
eatSomething('pencil');
// Argument of type '"pencil"' is not assignable to parameter of type '"sushi" | "ramen"'.
 
let food: Array<'sushi' | 'ramen'> = ['sushi'];
food.push('pencil');
// Argument of type '"pencil"' is not assignable to parameter of type '"sushi" | "ramen"'.
 
let object: { food: 'sushi' | 'ramen' };
object = { food: 'sushi' };
object = { food: 'pencil' };
// Type '"pencil"' is not assignable to type '"sushi" | "ramen"'.
```

So how do you create a string literal type?

When you define a string variable with `const`, it is of type string literal. However if you defined it with `let`, TypeScript sees that the value of the variable could change, so it assigns the variable to a more generic type:

```tsx
const food = 'sushi';
       
// const food: "sushi"
let drinks = 'beer';
      
// let drinks: string
```

The same reasoning applies to objects and arrays, as you can mutate the object / array value afterwards, so TypeScript assigns a more generic type:

```tsx
const food = 'sushi';
       
// const food: "sushi"
let drinks = 'beer';
      
// let drinks: string
```

However, you can hint TypeScript that you would only read the value from the object / array and not mutate it, by using the `[const` assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)

```tsx
const object = { food: 'sushi' } as const;
        
//const object: {
//    readonly food: "sushi";
//}
const array = ['sushi'] as const;
       
// const array: readonly ["sushi"]
```

Hover over to the `object.food` property and you'll see that now the type is a string literal `'sushi'` rather than `string`!

Differentiating a string literal type vs a string type allows TypeScript to know not just the type, as well the value of a string.

### ****Template Literal and String Literal Types****

Since [TypeScript 4.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types), TypeScript supports a new way to define a new string literal types, which is to use the familiar syntax of [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):

```tsx
const a = 'a';
const b = 'b';
// In JavaScript, you can build a new string
// with template literals
const c = `${a} ${b}`; // 'a b'
 
type A = 'a';
type B = 'b';
// In TypeScript, you can build a new string literal type
// with template literals too!
type C = `${A} ${B}`;
    
// type C = "a b"
```

### ****Conditional Type****

[Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) allow you to define a type based on another type. In this example, `Collection<X>` can be either `number[]` or `Set<number>` depending on the type of `X`:

```tsx
type Collection<X> = X extends 'arr' ? number[] : Set<number>;
 
type A = Collection<'arr'>;    
// type A = number[]

// If you pass in something other than 'arr'
type B = Collection<'foo'>;    
// type B = Set<number>
```

You use the `extends` keyword to test if the type `X` can be assigned to the type `'arr'`, and conditional operator (`condition ? a : b`) to determine the type if it test holds true or otherwise.

If you try to test a more complex type, you can infer parts of the type using the `infer` keyword, and define a new type based on the inferred part:

```tsx
// Here you are testing whether X extends `() => ???`
// and let TypeScript to infer the `???` part
// TypeScript will define a new type called
// `Value` for the inferred type
type GetReturnValue<X> = X extends () => infer Value ? Value : never;
 
// Here we inferred that `Value` is type `string`
type A = GetReturnValue<() => string>; 
// type A = string
 
// Here we inferred that `Value` is type `number`
type B = GetReturnValue<() => number>;
// type B = number
```

Whenever you want to define the type of a function in TypeScript, where the argument types and the return type depends on each other, you'll probably will reach out for either [Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads) or [Generic Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html#generic-functions).

What do I meant by having the argument types and return types depending on each other?

Here's an example where the return type is based on the argument type:

```tsx
function firstElement(arr) {
	return arr[0];
}
 
const string = firstElement(['a', 'b', 'c']);
const number = firstElement([1, 2, 3]);
```

... and here's another example where the 2nd argument type is based on the 1st argument type (argument types depending on each other):

```tsx
function calculate(operation, data) {
	if (operation === 'add') {
		return data.addend_1 + data.addend_2;
	} else if (operation === 'divide') {
		return data.dividend / data.divisor;
	}
}
 
calculate('add', { addend_1: 1, addend_2: 2 });
calculate('divide', { dividend: 42, divisor: 7 });
```

So, how do you define a function like this?

If you define

```tsx
function firstElement(arr: string[] | number[]): string | number {
	return arr[0];
}
```

then whatever returned is type `string | number`. This doesnt capture the essence of the function, which should return `string` if called the function with `string[]` and return `number` if you called with `number[]`.

Instead, you can define the function via [function overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads), which is to define multiple function signatures, followed by the implementation:

```tsx
// return string when passed string[]
function firstElement(arr: string[]): string;
// return number when passed number[]
function firstElement(arr: number[]): number;
// then the actual implementation
function firstElement(arr) {
	return arr[0];
}
 
const string = firstElement(['a', 'b', 'c']);
        
// const string: string
```

Alternatively, you can define a [generic function](https://www.typescriptlang.org/docs/handbook/2/functions.html#generic-functions), which declares a *type parameter*, and describe the argument type and return type in terms of the *type parameter*:

```tsx
// Define type parameter `Item` and describe argument and return type in terms of `Item`
function firstElement<Item>(arr: Item[]): Item | undefined {
	return arr[0];
}
```

A plus point for generics is that the `Item` type can be any types, and TypeScript can infer what the `Item` type represents from the arguments you called the function with, and dictates what the return type should be based on the `Item` type

```tsx
const obj = firstElement([{ a: 1 }, { a: 3 }, { a: 5 }]);
      
//const obj: {
//    a: number;
//} | undefined
```

If you do it with function overload, on the other hand, you'll probably have to define each and every possible function signatures.

But maybe you just want to pass in `string[]` or `number[]` to `firstElement(...)` only, so it's not a problem for function overloads.

Also, you can provide a constraint for the generic function, limiting that the `Item` type parameter can only be a certain type, by using the `extends` keyword:

```tsx
// `Item` can only be of `string` or `number`
function firstElement<Item extends string | number>(arr: Item[]): Item | undefined {
	return arr[0];
}
const number = firstElement([1, 3, 5]);
const obj = firstElement([{ a: 1 }, { a: 3 }, { a: 5 }]);
//Type '{ a: number; }' is not assignable to type 'string | number'.
//  Type '{ a: number; }' is not assignable to type 'number'.
//Type '{ a: number; }' is not assignable to type 'string | number'.
//  Type '{ a: number; }' is not assignable to type 'number'.
//Type '{ a: number; }' is not assignable to type 'string | number'.
//  Type '{ a: number; }' is not assignable to type 'number'.
```

## ****Working on the problem****

Knowing [generic functions](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#function-overloads-and-generic-functions), our solution to the problem will probably take the form:

```tsx
function get<Path extends string>(path: Path, callback: CallbackFn<Path>): void {
	// impplementation
}

get('/docs/[chapter]/[section]/args/[...args]', (req) => {
	const { params } = req;
});
```

We use a type parameter `Path`, which has to be a `string`. The `path` argument is of type `Path` and the callback will be `CallbackFn<Path>`, and the crux of the challenge is to figure out `CallbackFn<Path>`.

### ****The Game Plan****

So here's the plan:

```tsx
type Path = '/purchase/[shopid]/[itemid]/args/[...args]';
```

1. We derive a new type which has the string break into it's parts *[[jump here](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#splitting-a-string-literal-type)]*

```tsx
type Parts<Path> = 'purchase' | '[shopid]' | '[itemid]' | 'args' | '[...args]';
```

1. Filter out the parts to contain only the params *[[jump here](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#filter-out-only-the-parts-containing-the-param-syntax)]*

```tsx
type FilteredParts<Path> = '[shopid]' | '[itemid]' | '[...args]';
```

1. Remove the brackets *[[jump here](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#removing-the-brackets)]*

```tsx
type FilteredParts<Path> = 'shopid' | 'itemid' | '...args';
```

1. Map the parts into an **[object type](https://www.typescriptlang.org/docs/handbook/2/objects.html)** *[**[jump here](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#map-the-parts-into-an-object-type)**]*

```tsx
type Params<Path> = {
	shopid: any;
	itemid: any;
	'...args': any;
};
```

1. Using [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) to define the map value *[[jump here](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#defining-the-map-value)]*

```tsx
type Params<Path> = {
	shopid: number;
	itemid: number;
	'...args': string[];
};
```

1.  Remap keys to remove `'...'` in `...args` *[**[jump here](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#remap-keys-to-remove)**]*

```tsx
type Params<Path> = {
	shopid: number;
	itemid: number;
	args: string[];
};
```

1. Finally

```tsx
type CallbackFn<Path> = (req: { params: Params<Path> }) => void;
```

### ****Splitting a String Literal Type****

To split a string literal type, we can use a [conditional type](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#conditional-type) to check the value of the string literal:

```tsx
type Parts<Path> = Path extends `a/b` ? 'a' | 'b' : never;
type AB = Parts<'a/b'>;
     
// type AB = "a" | "b"
```

but to take in any string literal, that we have no idea of the value ahead of time,

```tsx
type CD = Parts<'c/d'>;
type EF = Parts<'e/f'>;
```

we will have to `infer` the value in the conditional tests, and use the inferred value type:

```tsx
type Parts<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? PartA | PartB
  : never;
type AB = Parts<'a/b'>;
// type AB = "a" | "b"

type CD = Parts<'c/d'>;     
// type CD = "c" | "d"

type EFGH = Parts<'ef/gh'>;      
// type EFGH = "ef" | "gh"
```

And if you pass in a string literal that does not match the pattern, we want to return the same string literal type passed in. So, we return the `Path` type in the `false` condition branch:

```tsx
type Parts<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? PartA | PartB
  : Path;
type A = Parts<'a'>;
    
// type A = "a"
```

At this point, you noticed that `PartA` will infer "non-greedily", ie: it will try to infer as much as possible, but do not contain a `"/"` character:

```tsx
type ABCD = Parts<'a/b/c/d'>;
// type ABCD = "a" | "b/c/d"

// type PartA = 'a';
// type PartB = 'b/c/d';
```

So, to split the `Path` string literal recursively, we can return the type `Parts<PathB>` instead of `PathB`:

```tsx
type Parts<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? PartA | Parts<PartB>
  : Path;
 
type ABCD = Parts<'a/b/c/d'>;
// type ABCD = "a" | "b" | "c" | "d"
```

Here's the breakdown of what happened:

```tsx
type Parts<'a/b/c/d'> = 'a' | Parts<'b/c/d'>;
type Parts<'a/b/c/d'> = 'a' | 'b' | Parts<'c/d'>;
type Parts<'a/b/c/d'> = 'a' | 'b' | 'c' | Parts<'d'>;
type Parts<'a/b/c/d'> = 'a' | 'b' | 'c' | 'd';
```

### ****Filter out only the parts containing the param syntax****

The key to this step is the observation that **any type [unions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) with `never` yields the type itself**.

```tsx
type A = 'a' | never;    
// type A = "a"

type Obj = { a: 1 } | never;   
//type Obj = {
//    a: 1;
//}
```

If we can transform

```tsx
'purchase' | '[shopid]' | '[itemid]' | 'args' | '[...args]'
```

into

```tsx
never | '[shopid]' | '[itemid]' | never | '[...args]'
```

then we will have

```tsx
'[shopid]' | '[itemid]' | '[...args]'
```

So, how, you asked?

Well, we'll have to reach out to [conditional types](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#conditional-type) again for help, we can have a conditional type that returns the string literal itself if it starts with `[` and ends with `]`, and `never` if otherwise:

```tsx
type IsParameter<Part> = Part extends `[${infer Anything}]` ? Part : never;
type Purchase = IsParameter<'purchase'>;
// type Purchase = never

type ShopId = IsParameter<'[shopid]'>;       
// type ShopId = "[shopid]"

type ItemId = IsParameter<'[itemid]'>;       
// type ItemId = "[itemid]"

type Args = IsParameter<'args'>;      
// type Args = never

type Args2 = IsParameter<'[...args]'>;      
// type Args2 = "[...args]"
```

Although we have no idea what the string content is in between `[]`, but we can infer it in the conditional type, and we do not have to use the inferred type.

Combining this with the previous step, we have:

```tsx
type IsParameter<Part> = Part extends `[${infer Anything}]` ? Part : never;
type FilteredParts<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? IsParameter<PartA> | FilteredParts<PartB>
  : IsParameter<Path>;
 
type Params = FilteredParts<'/purchase/[shopid]/[itemid]/args/[...args]'>;    
// type Params = "[shopid]" | "[itemid]" | "[...args]"
```

If you've been following along until this point, you probably have a clearer idea on how we can achieve this step.

So, why not take a pause and [try it out in the TypeScript Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAkgzgBQIYCckFsLAigPMlYAPigF4oDgoIAPbAOwBM4oADAbQBIBvAS3oBmOKAEF6IYAAt+AcwC+AXVZQA-BVRUAXFHoQAbjgDcAWABQoSFABivADbYUERpTj4kUkuWRTqdCExZWHn4hFHVCETkAemDBYUoAITlWMyhVWERUDCwcNwiSAB9rOwcnFzzgBKJUqG14AmyHNw8TUzMLaAb0OAB1XikAewBXSrQAYwBrLDJi+xwyjVcAciiwIZQxySQ4CCj2OEkBsF5GBT3+iHQTs9QZOD2AOifbuAUlokMgA)? *(I've added the boilerplate code in the link)*

To remove the bracket, we can modify the conditional type in the last step, and instead of returning the `Part`, we return the inferred type between the `[]`

```tsx
type IsParameter<Part> = Part extends `[${infer ParamName}]` ? ParamName : never;
type FilteredParts<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? IsParameter<PartA> | FilteredParts<PartB>
  : IsParameter<Path>;
 
type ParamsWithoutBracket = FilteredParts<'/purchase/[shopid]/[itemid]/args/[...args]'>;
```

In this step, we are going to create an [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html) using the result of the previous step as the key.

If you know the key type beforehand, you can create an object type via a type alias:

```tsx
type Params = {
  shopid: any,
  itemid: any,
  '...args': any,
};
```

If the key type is totally unknown, you can use the [Index Signature](https://dmitripavlutin.com/typescript-index-signatures/):

```tsx
type Params = {
  [key: string]: any;
};
const params: Params = { a: 1, b: 3, shopid: 2 };
```

However, in our case, the key type is not totally unknown, but it is dynamic. We use [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) which has a similar syntax as the index signature:

```tsx
type Params<Keys extends string> = {
  [Key in Keys]: any;
};
 
const params: Params<'shopid' | 'itemid' | '...args'> = {
  shopid: 2,
  itemid: 3, 
  '...args': 4,
};
 
const incorrect_keys: Params<'shopid' | 'itemid' | '...args'> = {
  a: 1,
// Type '{ a: number; b: number; shopid: number; }' is not assignable to type 'Params<"shopid" | "itemid" | "...args">'.
// Object literal may only specify known properties, and 'a' does not exist in type 'Params<"shopid" | "itemid" | "...args">'.
  b: 3,
  shopid: 2,
};
```

Building this on top of the previous step, we have:

```tsx
type IsParameter<Part> = Part extends `[${infer ParamName}]` ? ParamName : never;
type FilteredParts<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? IsParameter<PartA> | FilteredParts<PartB>
  : IsParameter<Path>;
type Params<Path> = {
  [Key in FilteredParts<Path>]: any;
};
 
type ParamObject = Params<'/purchase/[shopid]/[itemid]/args/[...args]'>;
         
//type ParamObject = {
//    shopid: any;
//    itemid: any;
//    "...args": any;
//}
```

Now if I ask you to come up with a type that is depending on the key value:

- if it is a string literal type that starts with `...`, **return a type `string[]`**
- else, **return a type `number`**

I hope that your inner voice is shouting [Conditional Types](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#conditional-type)!

And yes, we are going to use a Conditional Type:

```tsx
type ParamValue<Key> = Key extends `...${infer Anything}` ? string[] : number;
type ShopIdValue = ParamValue<'shopid'>;      
// type ShopIdValue = number

type ArgValue = ParamValue<'...args'>;        
// type ArgValue = string[]
```

But how do we get the `Key` type?

Well, in Mapped Types, when you write `{ [Key in ???]: any }`, the `Key` is the type alias of the key, which you can map it in the value type.

So writing this:

```tsx
type Params<Parts extends string> = {
  [Key in Parts]: ParamValue<Key>;
};
type ParamObject = Params<'shopid' | 'itemid' | '...args'>;
```

is the same as doing

```tsx
type Params = {
  'shopid': ParamValue<'shopid'>;
  'itemid': ParamValue<'itemid'>;
  '...args': ParamValue<'...args'>;
};
```

So, adding this on top of the previous step:

```tsx
type IsParameter<Part> = Part extends `[${infer ParamName}]` ? ParamName : never;
type FilteredParts<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? IsParameter<PartA> | FilteredParts<PartB>
  : IsParameter<Path>;
type ParamValue<Key> = Key extends `...${infer Anything}` ? string[] : number;
type Params<Path> = {
  [Key in FilteredParts<Path>]: ParamValue<Key>;
};
 
type ParamObject = Params<'/purchase/[shopid]/[itemid]/args/[...args]'>;
         
//type ParamObject = {
//    shopid: number;
//    itemid: number;
//    "...args": string[];
//}
```

### ****Remap keys to remove `'...'`**

Now the final step. We are going to remove `'...'` from the `'...args'` key, and I hope you can now proudly come up with the [Conditional Types](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#conditional-type) for it:

```tsx
type RemovePrefixDots<Key> = Key extends `...${infer Name}` ? Name : Key;
type Args = RemovePrefixDots<'...args'>;   
// type Args = "args"

type ShopId = RemovePrefixDots<'shopid'>;       
// type ShopId = "shopid"
```

But to apply this onto our Mapped Type, you can do a [Key Remapping via `as`](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as), which is available from TypeScript 4.1

```tsx
type IsParameter<Part> = Part extends `[${infer ParamName}]` ? ParamName : never;
type FilteredParts<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? IsParameter<PartA> | FilteredParts<PartB>
  : IsParameter<Path>;
type ParamValue<Key> = Key extends `...${infer Anything}` ? string[] : number;
type RemovePrefixDots<Key> = Key extends `...${infer Name}` ? Name : Key;
type Params<Path> = {
  [Key in FilteredParts<Path> as RemovePrefixDots<Key>]: ParamValue<Key>;
};
 
type ParamObject = Params<'/purchase/[shopid]/[itemid]/args/[...args]'>;
         
//type ParamObject = {
//    shopid: number;
//    itemid: number;
//    args: string[];
//}
```

And there you go!

Here's the final solution to [the challenge](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#the-challenge):

```tsx
type IsParameter<Part> = Part extends `[${infer ParamName}]` ? ParamName : never;
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
```

## Conclusion

I hope this is a fun challenge for you.

As you can see, there's endless possibilities with [Conditional Types](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#conditional-type) and [Template Literal Types](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/#template-literal-and-string-literal-types), allowing you to parse and derive types from a string literal type.

Before you go, here's another challenge, see if you can come up with the type for `Parse<Str>`:

```tsx
// `Parse` parses string into a nested string array of infinite level deep
// type Parse<Str extends string> = ?;
 
type EmptyArray = Parse<'[]'>;
         
type EmptyArray = []
type StringArray = Parse<'["hello", "world"]'>
         
type StringArray = ["hello", "world"]
type NestedArray = Parse<'["hello", ["world", "ts", ["!"]], ["try this"]]'>
         
type NestedArray = ["hello", ["world", "ts", ["!"]], ["try this"]]
```

And you just wanna see the answer, [here's the link to it](https://www.typescriptlang.org/play?#code/C4TwDgpgBAchDOwIBMDKwBOBLAdgcwEEMMBDEKAXiiNJAB5Ft8oAfWBJNTXQ4sgPgDcAWABQoSFFQBrLGFRgSAYwh10GKBAAeSHMnhRGPfpSmZNOiHoMADKABIA3rgBmEDeoC+dgPxTZ8ooqapgmAFxmGCKiYhLQAAokGPAQ6iEa2rr6htz4JlRiUJEWWbYARE6u7lAAaiQANgCuEJ4VzjhuGgBKEAC2JLg83oVFUH4A2jJyCsqqPf2DeQA0tQ3NALojRRGTmCuNehAuuCjr0bHgCUkpAJJIveklVtlGeZQjicmpmOkmmc8GcZVbp9AY4HgrYGrJoQTaiUZjaHNJ7WHJMPBbUYTeZgiFI2GY7ZQT4pdQ8GhkX4o7JAjrVHGLPCQukaOowuEIhF+NnI-6ouCIFBk-AUkCEznY0GMlY8gnwzkInYM8H4faHY44U7ionjZV4g7II4nZAc0Y7dRqw0a07ncSXYnXCB3PrwR58l65JlQHrwRr1YDUgwCzjC3i0fIfR3Oh7qP6WVG0zreqUqr1Q2WmorctbQd1BjhCz2i8YABkzWOTC1TgagNiWlRZldx+GG8oVfhJTvurqmgVmdD1yyg4wAdGOfX7gDKc+t+NqoEqU3jR+OEJPp+zyzrB16J-7y+a9lADUbNSaxBdJJ3Q6K3fGPeiVnuA3n2IKuOjRaZxrPTCN1DWNjjA2SZeDYmIdlG3ZqAEMzBLGT5rv6calMOUI7sySbPluiI7oB6wgfSS4tuBbYSsOGHJr6+7zouVb6uqxo4YeGCWqeWpkSxbHWia0RxA6Xx3qhrx4PkUCRl8N58PQsY1omRH0aqUDoUhwDln4eGvgA5Fp4oaap4oRJqABu7iYkZECmVEF52pIACivRgKAX5UJ2dBaT+WlCGIAD0PmjAAej4l7QFJtCmG5HllAAFhA9T1AA9mUKxlAA7glGD1MgZTrF5vn+UUQUhW+nAuQJKTueMMVxYlyXDmlGVZXVZTAPAdVVQAhDl6wrFVmDkMA0VYG16y5XOoh+YFPhAA)

## Extra

Here's the type I defined for the `Route` component in the example above

```tsx
import React from 'react';

type PathSegments<Path extends string> = Path extends `${infer SegmentA}/${infer SegmentB}`
  ? ParamOnly<SegmentA> | PathSegments<SegmentB>
  : ParamOnly<Path>;
type ParamOnly<Segment extends string> = Segment extends `:${infer Param}`
  ? Param
  : never;
type RouteParams<Path extends string> = {
  [Key in PathSegments<Path>]: string;
};

function Route<Path extends string>({}: {
  path: Path;
  render: (routeProps: {
    match: { params: RouteParams<Path> };
  }) => void;
}) {
  return <div />;
}

<Route
  path="/user/:username"
  render={(routeProps) => {
    const params = routeProps.match.params;
  }}
/>;
```

## **References**

- TypeScript Docs
    - **[Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)**
    - **[Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)**
    - **[Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)**
    - **[Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)**
    - **[Generic Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html#generic-functions)**
    - **[Objects](https://www.typescriptlang.org/docs/handbook/2/objects.html)**
    - **[Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)**
    - **[Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)**
- **[String Literal Types in TypeScript](https://mariusschulz.com/blog/string-literal-types-in-typescript)**
- **[Index Signatures in TypeScript](https://dmitripavlutin.com/typescript-index-signatures/)**
