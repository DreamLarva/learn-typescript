{
    function identity01(arg) {
        return arg;
    }
    // function loggingIdentity<T>(arg: T): T {
    //     console.log(arg.length);  // Error: T doesn't have .length
    //     return arg;
    // }
    function loggingIdentity1(arg) {
        console.log(arg.length); // Array has a .length, so no more error
        return arg;
    }
    function loggingIdentity2(arg) {
        console.log(arg.length); // Array has a .length, so no more error
        return arg;
    }
}
export {};
//# sourceMappingURL=6.1 使用泛型变量.js.map