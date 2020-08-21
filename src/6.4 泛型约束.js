/**
 * 约束泛型的 类型必须有哪些属性
 * */
{
    /**
     * 现在 T 代表的泛型 依然需要符合 接口LengthWise 的类型
     * */
    function loggingIdentity(arg) {
        console.log(arg.length);
        return arg;
    }
    function A(arg) {
        return arg;
    }
    // loggingIdentity(3); // Error 没有length方法
    loggingIdentity({ length: 10, value: 3 });
}
/**
 * 可以extends class
 * */
{
    class Lengthwise {
    }
    function loggingIdentity(arg) {
        console.log(arg.length);
        return arg;
    }
}
/**
 * 可以extends 字面量
 * */
{
    function loggingIdentity(arg) {
        console.log(arg.length);
        return arg;
    }
}
/**
 * 在泛型约束中使用类型参数
 * */
{
    /**
     * 此处 中文官网的部分不正确 需要参考英文官网的部分
     * */
    function getProperty(obj, key) {
        return obj[key];
    }
    let x = { a: 1, b: 2, c: 3, d: 4 };
    getProperty(x, "a"); // okay
    // getProperty(x, "m"); // Error 报错
}
/**
 * 在泛型里使用类类型
 * 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型。比如，
 * */
{
    /**
     * c 参数 为一个 实例化成 符合泛型T 的类
     *  new () => A
     *    等同于
     *  { new(): T }
     * */
    function create(c) {
        return new c();
    }
    class temp {
    }
    create(temp);
}
{
    class BeeKeeper {
    }
    class zooKeeper {
    }
    class Animal {
    }
    class Bee extends Animal {
    }
    class Lion extends Animal {
    }
    /**
     * new () => A 可以实例化为 A的类型(new xxx)
     * */
    //                      泛型A必须是Animal的派生类
    function createInstance(animal) {
        return new animal();
    }
    createInstance(Lion).keeper.nametag = "name";
    createInstance(Lion).numLegs = 4;
    createInstance(Bee).keeper.hasMask = true;
}
export {};
//# sourceMappingURL=6.4 泛型约束.js.map