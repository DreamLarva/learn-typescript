function foo(x) {
  if ("a" in x) {
    // 已经正确推断了 x 的类型 为 A
    x.c;
    return x.a;
  }
  return x.b; // 推断为 B
}
export {};
//# sourceMappingURL=2.7 in操作符细化和精确的 instanceof.js.map
