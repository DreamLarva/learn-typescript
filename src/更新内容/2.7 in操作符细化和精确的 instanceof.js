function foo(x) {
    if ("a" in x) {
        // 已经正确推断了 x 的类型 为 A
        x.c;
        return x.a;
    }
    return x.b; // 推断为 B
}
export {};
//# sourceMappingURL=2.7%20in%E6%93%8D%E4%BD%9C%E7%AC%A6%E7%BB%86%E5%8C%96%E5%92%8C%E7%B2%BE%E7%A1%AE%E7%9A%84%20instanceof.js.map