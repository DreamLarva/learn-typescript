/*
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
* */

type MayBe<T extends string> = T | "";

type protocol = MayBe<"http" | "https">;
type origin = MayBe<`${protocol}://`>;


type auth<A = string,P = string> = MayBe<`${string}:${string}@`>;

type IPv4 = `${number}.${number}.${number}.${number}`;
type commonHostName = `${string}.${string}`; // 匹配 x.y , x.y.z,  a.b.c.d
type hostname =
  | commonHostName
  | IPv4;

type host<H extends string  = hostname> = `${H}${MayBe<`:${number}`>}`;
type pathname = MayBe<`/${string}`>;
type search = MayBe<`?${string}`>;
type path = `${pathname}${search}`;
type hash = MayBe<`#{string}`>;

type href = `${origin}${auth}${host}${path}${hash}`;


type isValid<T extends string> = T extends href ? true : false;

type T1 = isValid<"">; // false
type T2 = isValid<"https://www.baidu.com">; // true
type T3 = isValid<"www.baidu.com">; // true
type T4 = isValid<"192.168.137.1">; // true

type IsInStart<T extends string, S extends string> = T extends `${S}${string}`
  ? true
  : false;
type IsInEnd<T extends string, S extends string> = T extends `${string}${S}`
  ? true
  : false;
type IsContain<
  T extends string,
  S extends string
> = T extends `${string}${S}${string}` ? true : false;

type GetPathName<T extends string> = T extends `/${infer P}/${infer R}`
  ? P | GetPathName<`/${R}`>
  : T extends `/${infer P}`
  ? P
  : never;

type T5 = GetPathName<"/1/2/34">

type GetPathName2<T extends string> = T extends `/${infer P}/${infer R}`
  ? [P ,... GetPathName2<`/${R}`>]
  : T extends `/${infer P}`
    ? [P]
    : never;

type T6 = GetPathName2<"/1/2/3/4">

type T7<T extends hash> = T extends `#${infer H}` ? H : never;




export {}
