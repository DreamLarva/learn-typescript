/**
 * 对返回 never 类型的方法 更好的支持
 * */
{
    /**
     * 正确推断了 返回值的类型
     * */
    function dispatch(x) {
        if (typeof x === "string") {
            return doThingWithString(x);
        }
        else if (typeof x === "number") {
            return doThingWithNumber(x);
        }
        process.exit(1); // process.exit(1)方法返回never
    }
}
export {};
//# sourceMappingURL=3.7%20Better%20Support%20for%20never-Returning%20Functions.js.map