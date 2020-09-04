/**
 * 函数声明
 * 在没有提供函数实现的情况下，有两种声明函数类型的方式:
 * */
{
    type LongHand = {
        (a: number): number;
    };
    type ShortHand = (a: number) => number;

    /**
     * 重载类型声明的话当然只能用 type
     * */
    type LongHandAllowsOverloadDeclarations = {
        (a: number): number;
        (a: string): string;
    };

    const a: LongHandAllowsOverloadDeclarations = <T>(a: T): T => {
        return a
    };
    const b: LongHandAllowsOverloadDeclarations = <T extends string | number>(a: T): T => {
        return a
    };
    const c: LongHandAllowsOverloadDeclarations = (a: any): any => {
        return a
    };

    /**
     * 不报错但是 逻辑有错误
     * */
    const f: LongHandAllowsOverloadDeclarations = (a: any): any => {
        return true
    };
    /**
     * 下面两个错误都是对应关系的错误
     * 入参的类型 没有完全对应返回值的类型
     * */

    // error
    // const d: LongHandAllowsOverloadDeclarations = (a: string | number): string | number => {
    //     return a
    // };

    // error
    // const e: LongHandAllowsOverloadDeclarations = (a: string | number): string | number => {
    //     if(typeof a === "string"){
    //         return a as string
    //     }else{
    //         return a as number
    //     }
    // };
}

/**
 * 为函数定义类型
 * */
{

    function add(x: number, y: number): number {
        return x + y;
    }

    let myAdd = function (x: number, y: number): number {
        /** 推断出结果确实是number 类型 */
        return x + y;
    };

    add(1, 2)
}

/**
 * 书写完整函数类型
 * */
{

    let myAdd1: (x: number, y: number) => number =
        function (x: number, y: number): number {
            return x + y;
        };
    myAdd1(1, 2);

    /**
     * 只要类型匹配 且次序匹配 就是兼容
     * */
    let myAdd2: (baseValue: number, increment: number) => number =
        function (x: number, y: number): number {
            return x + y;
        };
    myAdd2(1, 2);

    // 参数 多余 定义 Error(因为是字面量 作为传参的话 就能兼容)
    // let myAdd4: (baseValue: number, increment: number) => number =
    //     function (x: number, y: number, z: number): number {
    //         return x + y;
    //     };

    /**
     * 声明函数的时候 参数一个都不能多 也不能少
     * 函数作为参数 的 时候 参数可以多 不能少
     * */

    let myAdd3 = function (x: number, y: number): number {
        return x + y;
    };
    myAdd3(1, 2)


}


/**
 * 类型推断
 * */
{
    // myAdd has the full function type
    let myAdd1 = function (x: number, y: number): number {
        return x + y;
    };
    myAdd1(1, 2); // 之后方法提示为 number 的方法


    // The parameters `x` and `y` have the type number
    let myAdd2: (baseValue: number, increment: number) => number =
        function (x, y) {
            return x + y;
        };

    myAdd2(1, 2) // 之后方法提示为 number 的方法
}

export {}
