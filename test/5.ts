function arrayMap<T, U>(f: (x: T) => U) {
    return (a: T[]) => a.map(f);
}

const lengths: (a: string[]) => number[] = arrayMap(s => s.length);

type A = <T, U>(x: T, y: U) => [T, U];
type B = <S>(x: S, y: S) => [S, S];

function f(a: A, b: B) {
    a = b;  // Error
    b = a;  // Ok
}


interface Mappable<T> {
    map<U>(f: (x: T) => U): Mappable<U>;
}

declare let a: Mappable<number>;
declare let b: Mappable<string | number>;

a = b;
b = a;


function sendMessage(options: Options) {
    // ...
}
interface Options {
    data?: string,
    timeout?: number,
    maxRetries?: number,
}
const opts = {
    payload: "hello world!",
    retryOnFail: true,
}

// 错误!
sendMessage(opts);

const c = {a:1} as Object;
const d:Function = c
