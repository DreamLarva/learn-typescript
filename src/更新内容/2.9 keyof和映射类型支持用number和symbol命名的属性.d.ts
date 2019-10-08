declare type Arrayish<T> = {
    length: number;
    [x: number]: T;
};
declare type ReadonlyArrayish<T> = Readonly<Arrayish<T>>;
declare const map1: ReadonlyArrayish<string>;
declare let n: number;
declare let x: string;
