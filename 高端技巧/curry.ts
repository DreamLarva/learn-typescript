// 取元祖的 第一个元素的类型
type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never;

// 取元祖 除去第一个元素的 之外的元祖
type Tail<T extends any[]> = ((...t: T) => any) extends (
  _: any,
  ...tail: infer TT
) => any
  ? TT
  : [];

// 取元祖的最后一个类型

type Last<T extends any[]> = {
  0: Last<Tail<T>>;
  1: Head<T>;
}[HasTail<T> extends true ? 0 : 1];

type testLast = Last<[]>; // never

// 判断 元祖是否 有>= 2 个元素
type HasTail<T extends any[]> = T extends [] | [any] ? false : true;

/**
 * V0
 * 一次只执行 一个参数
 * */
type CurryV0<P extends any[], R> = (
  arg0: Head<P> // 一次调用 第一个参数的类型
) => HasTail<P> extends true // 如果没有到达最后一个参数 就递归
  ? CurryV0<Tail<P>, R>
  : R; // 否则返回最后一个返回类型

// 递归函数类型
declare function curryV0<P extends any[], R>(
  f: (...args: P) => R
): CurryV0<P, R>;

const toCurry02 = (a: string, b: number, C: boolean) => true;
const curried02 = curryV0(toCurry02); // CurryV0<[string,number,boolean],boolean>
const test23 = curried02("Jane")(26)(true); // boolean

const curried03 = curryV0(toCurry02); // CurryV0<[string,number,boolean],boolean>
const curried04 = curried03("Jane"); // CurryV0<[number,boolean],boolean>
const curried05 = curried04(26); // CurryV0<[boolean],boolean>
const test24 = curried05(true); // boolean

/**
 * V1
 * */
const toCurry06 = (name: string, ages: number, ...nicknames: string[]) => true;
const curried06 = curryV0(toCurry06);
// const test26 = curried06('Jane')(26)('JJ',"jini") // error

/**
 * 如果使用神域参数的话 V0 版本就不行了,所以要每次提交 >= 1 个参数,并且还要可以使用剩余的(可选的参数)
 * */
type CurryV1<P extends any[], R> = (
  arg0: Head<P>,
  ...rest: Tail<Partial<P>>
) => HasTail<P> extends true ? CurryV1<Tail<P>, R> : R;
declare function curryV1<P extends any[], R>(
  f: (...args: P) => R
): CurryV1<P, R>;
const toCurry07 = (name: string, age: number, ...nicknames: string[]) => true;
const curried07 = curryV1(toCurry06);
const test27 = curried07("jane", 26, "jj", "jini");
// 设计上有问题 参数没有按照次序消耗
const test28 = curried07("jane", 26, "jj")(26, "jj"); // should error

/**
 * V2
 * 完全不能用了 因为函数的入参(T) 完全不受控制了
 * */
type CurryV2<P extends any[], R> = <T extends any[]>(
  ...args: T
) => HasTail<P> extends true ? CurryV2<Tail<T>, R> : R;

/**
 * 更多的工具方法
 * 我们需要一个方法可以 跟踪参数(知道哪些倍消耗了,哪些将要被消耗)
 * */
/**
 * Length
 * 获取数组的长度
 * */
type Length<T extends any[]> = T["length"];

type test30 = Length<[]>; // 0
type test31 = Length<[any, any]>; // 2
type test32 = Length<[any, any, any]>; // 3

/**
 * Prepend
 * 在元祖 T 最前面添加一个类型 E
 * */
// prettier-ignore
type Prepend<E, T extends any[]> =
    ((head: E, ...args: T) => any) extends (...args: infer U) => any
  ? U
  : T;

type test34 = Prepend<string, []>; // [string]
type test35 = Prepend<number, [1, 2]>; // [number,1,2]

/**
 * Drop
 * 取 元祖T 去除 前N个后的类型
 * Drop 类型会递归直到Length<I>匹配的值 传入的N.换句话说，索引的类型 0 由条件类型选择，直到满足该条件。
 * 我们用 Prepend<any, I> 这样我们就可以像在循环中那样增加计数器。从而， Length<I> 用作递归计数器，
 * */
type Drop<N extends number, T extends any[], I extends any[] = []> = {
  0: Drop<N, Tail<T>, Prepend<any, I>>; // I 相当于一个计数器从0 开始没递归一个次(Prepend) 就加1
  1: T;
}[Length<I> extends N ? 1 : 0];

type test39 = Drop<2, [0, 1, 2, 3]>; // [2,3]
type test40 = Drop<Length<test39>, [0]>; // []

/**
 * CurryV3
 * */
type parameters = [string, number, boolean, string[]];
type consumed = [string, number];
type toConsume = Drop<Length<consumed>, parameters>; // [boolean,string[]]

// error
// type CurryV3<P extends any[], R> = <T extends any[]>(
//   ...args: T
// ) => Length<Drop<Length<T>, P>> extends 0 ? R : CurryV2<Drop<Length<T>, P>, R>;

/**
 * Cast
 * 强行把 符合 Y 类型的 X, 类型定位 X 否则定位 Y
 * */
type Cast<X, Y> = X extends Y ? X : Y;
type test41 = Cast<[string], any>; // [string]
type test42 = Cast<[string], number>; // number

/**
 * curry V4
 * 由于V3 回报类型错误 递归可能无限
 * TS 3.9.3  报错
 * */
// type CurryV4<P extends any[], R> =
//     <T extends any[]>(...args: Cast<T,Partial<P>>) =>
//         Length<Cast<Drop<Length<T>, P>,any[]>> extends 0
//             ? R
//             : CurryV4<Cast<Drop<Length<T>, P>,any[]>, R>;

/**
 * curry V5
 * 处理 rest 参数
 * TS 3.9.3  报错
 * */
// type CurryV5<P extends any[], R> =
//     <T extends any[]>(...args: Cast<T,Partial<P>>) =>
//         Drop<Length<T>, P> extends [any,...any[]]
//             ? CurryV5<Cast<Drop<Length<T>, P>, any[]>, R>
//             : R

/**
 * Pos
 * Use it to query the position of an iterator
 * */
type Pos<I extends any[]> = Length<I>;

/**
 * Next(+1)
 * It brings the position of an iterator up
 * */
type Next<I extends any[]> = Prepend<any, I>;

/**
 * Prev(-1)
 * It brings the position of an iterator down
 * */
type Prev<I extends any[]> = Tail<I>;

type iterator = [any, any];
type test50 = Pos<iterator>; // 2
type test51 = Pos<Next<iterator>>; // 3
type test52 = Pos<Prev<iterator>>; // 1

/**
 * Iterator1
 * It creates an iterator (our counter type) at a position defined by Index and is able to start off from another iterator’s position by using From
 * 从From 的元祖 截取 >= Index 的元祖
 * */
type Iterator1<
  Index extends number = 0,
  From extends any[] = [],
  I extends any[] = []
> = {
  0: Iterator1<Index, Next<From>, Next<I>>;
  1: From;
}[Pos<I> extends Index ? 1 : 0];

type test53 = Iterator1<2>; // [any,any]
type test54 = Iterator1<3, test53>; // [any,any,any,any,any]
type test55 = Pos<test53>; // 2
type test56 = Pos<test54>; // 5

export type List<A = any> = ReadonlyArray<A>;
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;

/**
 * Reverse
 * 翻转 元祖类型的顺序
 * */
type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
  0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>;
  1: R;
}[Pos<I> extends Length<T> ? 1 : 0];

type test57 = Reverse<[1, 2, 3]>; // [3,2,1]
type test58 = Reverse<test57>; // [1,2,3]
type test59 = Reverse<[2, 1], [3, 4]>; // [1,2,3,4]



/**
 * Concat
 * */
type Concat<T1 extends List,T2 extends List> = Reverse<Reverse<T1>,T2>



Array(20).fill(0).map( v => { /**/})
Array.from({length:20}).map( v => { /**/})
