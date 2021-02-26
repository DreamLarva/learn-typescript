{
    function deepFlatten(x) {
        throw "not implemented";
    }
    // All of these return the type 'number[]':
    deepFlatten([1, 2, 3]);
    deepFlatten([[1], [2, 3]]);
    deepFlatten([[1], [[2]], [[[3]]]]);
}
/**
 * 获取 递归的 Promise 的值
 * */
{
}
{
    // type T4 = TupleOf<number, 100>;  // Depth error
}
unbox(b1); // string
unbox(b2); // string (previously T6)
unbox({ value: { value: { value: 5 } } }); // number (previously { value: { value: number }})
{
    function checkOptions(opts) {
        opts.path; // string
        opts.permissions; // number
        // These are all allowed too!
        // They have the type 'string | number'.
        const a = opts.yadda;
        const b = opts["foo bar baz"];
        const c = opts[Math.random()];
    }
}
export {};
//# sourceMappingURL=4.1%20%E9%80%92%E5%BD%92%E6%9D%A1%E4%BB%B6%E7%B1%BB%E5%9E%8B.js.map