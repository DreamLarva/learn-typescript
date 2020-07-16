export declare type List<A = any> = ReadonlyArray<A>;
export declare type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
