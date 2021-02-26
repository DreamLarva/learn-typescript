const record = {
    key: {
        a: 1,
        b: 1,
        c: "string",
        d: true,
        e: () => { },
    },
};
const Parameters_1 = []; // 无参数 就是 空数组
function f1(s) {
    return { a: 1, b: s };
}
class C {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
const Omit_1_1 = { d: true }; // 排除了属性 a,b,c,e 现在只能有d
{
}
{
    function test(t) {
        t.b; // number
        t.a; // 1
    }
}
/**
 * {} 和 所有属性都是可选的对象 可兼容
 * */
{
}
{
}
{
}
/**
 * From 4.1
 * */
{
    // type T43 = Uppercase<42>;  // Error, type 'number' does not satisfy the constraint 'string'
}
/**
 * 联合类型 转 元组
 * 太牛逼了
 * */
{
    class BHAAL {
        constructor() {
            this.isBhaal = true;
        }
    }
    //     ^? = [2, 1, 3, 5, 10, -9, 100, 1001, 102, 123456, 100000000, "alice", [[[BHAAL]]], "charlie"]
}
/**
 * 元组类型 转联合 类型
 * */
{
    class BHAAL {
        constructor() {
            this.isBhaal = true;
        }
    }
}
export {};
//# sourceMappingURL=%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7%E7%B1%BB%E5%9E%8B.js.map