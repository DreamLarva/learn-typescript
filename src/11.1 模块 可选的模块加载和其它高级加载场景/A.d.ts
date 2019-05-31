interface A {
    a: 1,
    b: "2"
}

declare let $1: A; // 在全局声明一个 $1实例 它符合A类型
export default $1;
