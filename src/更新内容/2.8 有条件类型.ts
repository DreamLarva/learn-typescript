/**
 * From 2.8
 * TypeScript 2.8引入了有条件类型，它能够表示非统一的类型。 有条件的类型会以一个条件表达式进行类型关系检测，从而在两种类型中选择其一：
 *      T extends U ? X : Y
 * 上面的类型意思是，若T能够赋值给U，那么类型是X，否则为Y。
 *
 * 有条件的类型T extends U ? X : Y或者解析为X，或者解析为Y，再或者延迟解析，因为它可能依赖一个或多个类型变量。
 * 是否直接解析或推迟取决于：
 *      1. 首先，令T'和U'分别为T和U的实例，并将所有类型参数替换为any，如果T'不能赋值给U'，则将有条件的类型解析成Y。
 *      直观上讲，如果最宽泛的T的实例不能赋值给最宽泛的U的实例，那么我们就可以断定不存在可以赋值的实例，因此可以解析为Y。
 *
 *      2. 其次，针对每个在U内由推断声明引入的类型变量，依据从T推断到U来收集一组候选类型（使用与泛型函数类型推断相同的推断算法）。
 *      对于给定的推断类型变量V，如果有候选类型是从协变的位置上推断出来的，
 *      那么V的类型是那些候选类型的联合。反之，如果有候选类型是从逆变的位置上推断出来的，那么V的类型是那些候选类型的交叉类型。否则V的类型是never。
 *
 *      3. 然后，令T''为T的一个实例，所有推断的类型变量用上一步的推断结果替换，如果T''明显可赋值给U，那么将有条件的类型解析为X。
 *      除去不考虑类型变量的限制之外，明显可赋值的关系与正常的赋值关系一致。直观上，当一个类型明显可赋值给另一个类型，我们就能够知道它可以赋值给那些类型的所有实例。
 *
 *      4. 否则，这个条件依赖于一个或多个类型变量，有条件的类型解析被推迟进行。
 * */
{
    type TypeName<T> =
        T extends string ? "string" :
            T extends number ? "number" :
                T extends boolean ? "boolean" :
                    T extends undefined ? "undefined" :
                        T extends Function ? "function" :
                            "object";

    type T0 = TypeName<string>;  // "string"
    type T1 = TypeName<"a">;  // "string"
    type T2 = TypeName<true>;  // "boolean"
    type T3 = TypeName<() => void>;  // "function"
    type T4 = TypeName<string[]>;  // "object"
}
{
    class Animal {
        a!: 1
    }

    class Dog extends Animal {
        b!: 2
    }

    class Corgi extends Dog {
        c!: 3
    }

    type TypeName<T> =
        T extends (x: Dog) => Dog ? true : false

    type T0 = TypeName<(x: Dog) => Dog>  // true
    type T1 = TypeName<(x: Animal) => any>  // true 参数抗变
    type T2 = TypeName<(x: any) => Corgi> // true 返回值 协变
    type T3 = TypeName<(x: Animal) => Corgi> // true

    type T4 = TypeName<(x: Animal, y: number) => Corgi> // false 参数抗变 只能少不能多
    type T6 = TypeName<(...x: Animal[]) => any> // 同上

    type T5 = TypeName<(x: Animal) => Corgi & { a: 1 }> // true 返回值 可以 原类型的交叉类型

    type T7 = TypeName<(x: Animal) => { a: 1 }> // false
}

/**
 * 分布式有条件类型
 * 如果有条件类型里待检查的类型是naked type parameter，那么它也被称为“分布式有条件类型”。 分布式有条件类型在实例化时会自动分发成联合类型。
 * 例如，实例化T extends U ? X : Y，T的类型为A | B | C，会被解析为(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)。
 *
 * 也就是如果 T 为联合类型 就会 联合的每个类型 都会分别判断 然后 在联合在一起
 * */
{
    type TypeName<T> =
        T extends string ? "string" :
            T extends number ? "number" :
                T extends boolean ? "boolean" :
                    T extends undefined ? "undefined" :
                        T extends Function ? "function" :
                            "object";
    type T10 = TypeName<string | (() => void)>;  // "string" | "function"
    type T12 = TypeName<string | string[] | undefined>;  // "string" | "object" | "undefined"
    type T11 = TypeName<string[] | number[]>;  // "object"
}
/**
 * 在T extends U ? X : Y的实例化里，对T的引用被解析为联合类型的一部分（比如，T指向某一单个部分，在有条件类型分布到联合类型之后）。
 * 此外，在X内(也就是 true 的分支内 使用的T 是被 U 类型所约束的) 对T的引用有一个附加的类型参数约束U（例如，T被当成在X内可赋值给U）。
 * */
{
    type BoxedValue<T> = { value: T };
    type BoxedArray<T> = { array: T[] };
    // 如果 T 是 数组
    type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;

    type T20 = Boxed<string>;  // BoxedValue<string>;
    type T21 = Boxed<number[]>;  // BoxedArray<number>;
    type T22 = Boxed<string | number[]>;  // BoxedValue<string> | BoxedArray<number>;
}
/**
 * 有条件类型的分布式的属性可以方便地用来过滤联合类型
 * */
{
    type Diff<T, U> = T extends U ? never : T;  // 从 T 中移除 符合 U 的类型
    type Filter<T, U> = T extends U ? T : never;  // 从 T 中移除 不符合 U 的类型

    type T30 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
    type T31 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"
    type T32 = Diff<string | number | (() => void), Function>;  // string | number
    type T33 = Filter<string | number | (() => void), Function>;  // () => void

    type NonNullable<T> = Diff<T, null | undefined>;  // 筛选掉 T 泛型中的 null 和 undefined 类型

    type T34 = NonNullable<string | number | undefined>;  // string | number
    type T35 = NonNullable<string | string[] | null | undefined>;  // string | string[]
    type T36 = NonNullable<string | null | undefined | void>;  // string | void   ........

    function f1<T>(x: T, y: NonNullable<T>) {
        x = y;  // Ok
        // y = x;  // Error
    }

    function f2<T extends string | undefined>(x: T, y: NonNullable<T>) {
        x = y;  // Ok
        // y = x;  // Error
        // let s1: string = x;  // Error
    }
}
/**
 * 有条件类型与映射类型结合时特别有用
 * */
{
    type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]; // 所有实例 T 中 方法的索引(key)的联合
    type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>; // 所有实例 T 中 方法的类型的联合

    type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]; // 所有实例 T 中 属性的索引(key)的联合
    type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>; // 所有实例 T 中 属性的类型的联合

    interface Part {
        id: number;
        name: string;
        subparts: Part[];

        updatePart(newName: string): void;

        anotherFoo(newName: string): void;
    }

    type T40 = FunctionPropertyNames<Part>;  // "updatePart"
    type T41 = NonFunctionPropertyNames<Part>;  // "id" | "name" | "subparts"
    type T42 = FunctionProperties<Part>;  // { updatePart(newName: string): void }
    type T43 = NonFunctionProperties<Part>;  // { id: number, name: string, subparts: Part[] }
}
/**
 * 与联合类型和交叉类型相似，有条件类型不允许递归地引用自己。比如下面的错误。
 * */
{
    // type ElementType<T> = T extends any[] ? ElementType<T[number]> : T;  // Error 不允许递归自己
}
/**
 * 有条件类型中的类型推断
 *
 * 现在在有条件类型的extends子语句中，允许出现infer声明，它会引入一个待推断的类型变量。
 * 这个推断的类型变量可以在有条件类型的true分支中被引用。
 * 允许出现多个同类型变量的infer。
 * */
{
    // 返回 传入函数的 返回值的类型
    type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
    type T0 = ReturnType<() => number> // 推断为 number
    type T1<T> = ReturnType<() => T> // 推断为 {}
}
{
    type Unpacked<T> =
        T extends (infer U)[] ? U :
            T extends (...args: any[]) => infer U ? U :
                T extends Promise<infer U> ? U :
                    T;

    type T0 = Unpacked<string>;  // string
    type T1 = Unpacked<string[]>;  // string
    type T2 = Unpacked<() => string>;  // string
    type T3 = Unpacked<Promise<string>>;  // string
    type T4 = Unpacked<Promise<string>[]>;  // Promise<string>
    type T5 = Unpacked<Unpacked<Promise<string>[]>>;  // string
    type T6 = Unpacked<{ a: number }>;  // {a:number}

    /**
     * 下面的例子解释了在协变位置上，同一个类型变量的多个候选类型会被推断为联合类型
     * */
    type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;
    type T10 = Foo<{ a: string, b: string }>;  // string
    type T11 = Foo<{ a: string, b: number }>;  // string | number
    type T12 = Foo<{ a: { a: string }, b: { b: number } }>;  // {a:string} | {b:number}
    /**
     * 相似地，在 ** 抗变位置 ** 上，同一个类型变量的多个候选类型会被推断为交叉类型：
     * */
    type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;
    type T20 = Bar<{ a: (x: string) => void, b: (x: string) => void }>;  // string
    type T21 = Bar<{ a: (x: string) => void, b: (x: number) => void }>;  // string & number

}


export {};
