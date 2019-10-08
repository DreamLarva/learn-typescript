/**
 * 首先， instanceof操作符现在利用继承链而非依赖于结构兼容性， 能更准确地反映出 instanceof操作符在运行时的行为。
 * 这可以帮助避免一些复杂的问题，当使用 instanceof去细化结构上相似（但无关）的类型时。
 * */
interface A {
    a: number
    c:1
}

interface B {
    b: string
    d:2
}

function foo(x: A | B) {
    if ("a" in x) {
        // 已经正确推断了 x 的类型 为 A
        x.c;
        return x.a;
    }
    return x.b; // 推断为 B
}
