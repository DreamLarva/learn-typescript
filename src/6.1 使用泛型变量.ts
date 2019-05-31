{
    function identity01<T>(arg: T): T {
        return arg;
    }

    // function loggingIdentity<T>(arg: T): T {
    //     console.log(arg.length);  // Error: T doesn't have .length
    //     return arg;
    // }

    function loggingIdentity1<T>(arg: T[]): T[] {
        console.log(arg.length);  // Array has a .length, so no more error
        return arg;
    }

    function loggingIdentity2<T>(arg: Array<T>): Array<T> {
        console.log(arg.length);  // Array has a .length, so no more error
        return arg;
    }
}

export {}
