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
//# sourceMappingURL=6.1%20%E4%BD%BF%E7%94%A8%E6%B3%9B%E5%9E%8B%E5%8F%98%E9%87%8F.js.map