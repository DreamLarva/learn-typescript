/**
 * any 类型指代所有类型
 * 且 使用.操作符 获得的类型 依然是 any
 * */
{
    let notSure: any = 4;
    notSure = "maybe a string instead";
    notSure = false; // okay, definitely a boolean
}

/**
 * void 类型
 * 可以 赋值undefined
 * */
{
    let unusable: void = undefined;
    // unusable = null; // 现在不允许 给 void 赋值null
}

/**
 * Null 和 Undefined
 * */
{
    let u: undefined = undefined;
    let n: null = null;
}

/**
 * Never
 * never类型表示的是那些永不存在的值的类型
 * 如报错 或者 无限循环
 * */
{
    // 返回never的函数必须存在无法达到的终点
    function error(message: string): never {
        throw new Error(message);
    }

    // 推断的返回值类型为never
    function fail() {
        return error("Something failed");
    }

    // 返回never的函数必须存在无法达到的终点
    function infiniteLoop(): never {
        while (true) {
        }
    }

    // 当推断时 只要有 非never 类型的 就是推断为非 never 类型
    // 当仅有 never 类型 才推断为 never 类型
    let a = 1 || new Error();

    // never 类型 和 任意非never类型 T 的联合类型 为 T
    type b = never | number; // 推断类型 为 number

    type c = Promise<number | never> // Promise<number>
}

/**
 * object类型
 * TypeScript没有表示非基本类型的类型，即不是number | string | boolean | symbol | null | undefined的类型。
 * */
{
    function create(param: object) {
    }

    create({prop: 0}); // OK
    create({}); // OK

    // create(null); // error
    // create(42); // Error
    // create("string"); // Error
    // create(false); // Error
    // create(undefined); // Error
    create(() => {
    });

    /**
     * {} 指代 null 和 undefined 外的所有类型
     * */
    function create_1(param: {}) {
    }

    create_1({prop: 0}); // OK
    create_1({}); // OK
    // create_1(null); // error
    create_1(42); // ok
    create_1("string"); // ok
    create_1(false); // ok
    // create_1(undefined); // error
    create_1(() => {
    }); // ok
}

/**
 * Function类型
 * 代表最广泛的任意的函数
 * */
{
    type a = Function;
    type b = (...x: any[]) => any;
    let a!: a;
    let b!: b;

    a = b;
    // b = a // Error
}

/**
 * unknown 类型
 * 任何值都可以赋给unknown，
 * 但是当没有类型断言或基于控制流的类型细化时unknown不可以赋值给其它类型，除了它自己和any外。
 * 同样地，在unknown没有被断言或细化到一个确切类型之前，是不允许在其上进行任何操作的。
 * */
{
    // 与任何一个 非unknown类型 交叉 成为 非unknown 类型

    type T00 = unknown & null; // null
    type T01 = unknown & undefined; // undefined
    type T02 = unknown & null & undefined; // null & undefined (which becomes never)
    type T03 = unknown & string; // string
    type T04 = unknown & string[]; // string[]
    type T05 = unknown & unknown; // unknown
    type T06 = unknown & any; // any


    // 与任何一个 非unknown类型 联合 成为 unknown 类型
    // 与any 类型 联合 依然是 any
    type T10 = unknown | null; // unknown
    type T11 = unknown | undefined; // unknown
    type T12 = unknown | null | undefined; // unknown
    type T13 = unknown | string; // unknown
    type T14 = unknown | string[]; // unknown
    type T15 = unknown | unknown; // unknown
    type T16 = unknown | any; // any

    // 泛型与 unknown 类型预算 联合 为unknown 交叉为 T
    type T20<T> = T & {}; // T & {}
    type T21<T> = T | {}; // T | {}
    type T22<T> = T & unknown; // T
    type T23<T> = T | unknown; // unknown

    // unknown in conditional types

    type T30<T> = unknown extends T ? true : false; // Deferred
    type T31<T> = T extends unknown ? true : false; // Deferred (so it distributes)
    type T32<T> = never extends T ? true : false; // true
    type T33<T> = T extends never ? true : false; // Deferred

    // keyof unknown

    type T40 = keyof any; // string | number | symbol
    type T41 = keyof unknown; // never

    // unknown 类型不能参与 非 == === != !== 运算
    function f10(x: unknown) {
        x == 5;
        x !== 10;
        // x >= 0; // Error
        // x + 1; // Error
        // x * 2; // Error
        // -x; // Error
        // +x; // Error
    }

    // unknown 无任何属性 和方法 也不能作为 函数调用
    function f11(x: unknown) {
        // x.foo; // Error
        // x[5]; // Error
        // x(); // Error
        // new x(); // Error
    }



    // Homomorphic mapped type over unknown
    type T50<T> = { [P in keyof T]: number };
    type T51 = T50<any>; // { [x: string]: number }
    type T52 = T50<unknown>; // {}

    // Anything is assignable to unknown
    function f21<T>(pAny: any, pNever: never, pT: T) {
        let x: unknown;
        x = 123;
        x = "hello";
        x = [1, 2, 3];
        x = new Error();
        x = x;
        x = pAny;
        x = pNever;
        x = pT;


    }

    // unknown assignable only to itself and any
    function f22(x: unknown) {
        let v1: any = x;
        let v2: unknown = x;
        // let v3: object = x; // Error
        // let v4: string = x; // Error
        // let v5: string[] = x; // Error
        // let v6: {} = x; // Error
        // let v7: {} | null | undefined = x; // Error
    }

    // Type parameter 'T extends unknown' not related to object
    function f23<T extends unknown>(x: T) {
        // let y: object = x; // Error
    }

    // Anything but primitive assignable to { [x: string]: unknown }
    function f24(x: { [x: string]: unknown }) {
        x = {};
        x = {a: 5};
        // x = [1, 2, 3]; // error
        // x = 123; // Error
    }

    // Locals of type unknown always considered initialized
    function f25() {
        let x: unknown;
        let y = x;
    }

    // Spread of unknown causes result to be unknown
    function f26(x: {}, y: unknown, z: any) {
        let o1 = {a: 42, ...x}; // { a: number }
        // let o2 = {a: 42, ...x, ...y}; // error 版本3.7.2 只要对象类型才能展开 unknown 类型不再可以使用 spread 运算符
        // let o3 = {a: 42, ...x, ...y, ...z}; // error 版本3.7.2 只要对象类型才能展开 unknown 类型不再可以使用 spread 运算符
    }

    // Functions with unknown return type don't need return expressions
    // function f27(): unknown {} // error
    function f27(): unknown {return}

    // Rest type cannot be created from unknown
    function f28(x: unknown) {
        // let {...a} = x; // Error
    }

    // Class properties of type unknown don't need definite assignment
    class C1 {
        // a: string; // Error
        b: unknown;
        c: any;
    }
}
// 可以对 unknown 类型的 数据使用 typeof instanceof 和其他 断言保护
declare function isFunction(x: unknown): x is Function;
function f20(x: unknown) {
    if (typeof x === "string" || typeof x === "number") {
        x; // string | number
    }
    if (x instanceof Error) {
        x; // Error
    }
    if (isFunction(x)) {
        x; // Function
    }
}

/**
 * 特别的提示
 * {} 类型 就是 任意 可以 用 .xxx 的类型 也就是 除 null 和 undefined 的类型
 * */
{
    const a: {} = {a: {b: {}}};
    const b: {} = 1;
    const c: {} = true;
    const d: {} = [];
    // const e: {} = null // error
    // const f: {} = undefined // error
    const g: {} = NaN;
    const h: {} = () => null;
}

export {};
