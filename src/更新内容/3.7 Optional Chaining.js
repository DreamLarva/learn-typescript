var _a;
/**
 * ts 会阻止你 获取 null 或 undefined 的上的值
 * 使用 ?. 关键字(这两个字符是必须的 对于 索引是 ?.[xx])
 * */
let x = foo === null || foo === void 0 ? void 0 : foo.bar.baz();
// 编译后的结果
// let x = (_a = foo) === null || _a === void 0 ? void 0 : _a.bar.baz();
/**
 * 注意 optional chaining 和 && 的区别
 * && 依然会受到 0 , "" , NaN  , false 等“falsy” values 的 影响
 * ?. 只受 undefined 和 null 的影响
 * */
{
    // Before
    if (foo && foo.bar && foo.bar.baz) {
        // ...
    }
    // After-ish
    if ((_a = foo === null || foo === void 0 ? void 0 : foo.bar) === null || _a === void 0 ? void 0 : _a.baz) {
        // ...
    }
}
/**
 * Optional chaining also includes two other operations.
 * First there’s the optional element access which acts similarly to optional property accesses,
 * but allows us to access non-identifier properties
 * (e.g. arbitrary strings, numbers, and symbols):
 * */
{
    /**
     * Get the first element of the array if we have an array.
     * Otherwise return undefined.
     */
    function tryGetFirstElement(arr) {
        return arr === null || arr === void 0 ? void 0 : arr[0]; // 返回的类型正确 为 T | undefined
        // equivalent to
        //   return (arr === null || arr === undefined) ?
        //       undefined :
        //       arr[0];
    }
}
/**
 * 同样可以使用在 调用方法
 * 当然 new 新建实例 不行 因为 new 在前面呀
 * */
{
    async function makeRequest1(url, log) {
        log === null || log === void 0 ? void 0 : log(`Request started at ${new Date().toISOString()}`);
        // roughly equivalent to
        //   if (log != null) {
        //       log(`Request started at ${new Date().toISOString()}`);
        //   }
        const result = (await fetch(url)).json();
        log === null || log === void 0 ? void 0 : log(`Request finished at at ${new Date().toISOString()}`);
        return result;
    }
}
/**
 * optional chaining 只限制了取值的操作 并没有 限制其他的操作
 * */
{
    function someComputation() {
        return 1;
    }
    // 就算 foo 为空 那么 foo?.bar 为 undefined  但是 触发运算 以及 someComputation方法依然会执行
    let result = (foo === null || foo === void 0 ? void 0 : foo.bar) / someComputation();
    // 编译的结果是
    // let result = ((_a = foo) === null || _a === void 0 ? void 0 : _a.bar) / someComputation();
}
/**
 * 有这个 编译参数的时候 -strictNullChecks
 * 当还是要做其他 操作的时候 还是会要确保类型
 * 比如 数学运算 还是要确保数字类型
 * */
{
    function barPercentage(foo) {
        // return foo?.bar / 100;
        //     ~~~~~~~~
        // Error: Object is possibly undefined.
    }
}
export {};
//# sourceMappingURL=3.7%20Optional%20Chaining.js.map