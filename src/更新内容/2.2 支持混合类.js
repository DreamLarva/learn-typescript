/**
 * From Typescript 2.2
 * 个人理解 就是 动态继承 某个类型
 * */
/**
 * 混合构造函数类型
 * 指仅有单个构造函数签名，且该签名仅有一个类型为 any[] 的变长参数，
 * 返回值为对象类型. 比如, 有 X 为对象类型, new (...args: any[]) => X 是一个实例类型为 X 的混合构造函数类型。
 * */
/**
 * 混合类
 * 指一个extends(扩展)了类型参数类型的表达式的类声明或表达式. 以下规则对混合类声明适用：
 *      extends表达式的类型参数类型必须是混合构造函数.
 *      混合类的构造函数 (如果有) 必须有且仅有一个类型为any[]的变长参数, 并且必须使用展开运算符在super(...args)调用中将这些参数传递。
 * */
/**
 * 假设有类型参数为T且约束为X的表达式Base，处理混合类class C extends Base {...}时会假设Base有X类型，
 * 处理结果为交叉类型typeof C & T。换言之，一个混合类被表达为混合类构造函数类型与参数基类构造函数类型的交叉类型.
 * */
/**
 * 在获取一个包含了混合构造函数类型的交叉类型的构造函数签名时，混合构造函数签名会被丢弃，
 * 而它们的实例类型会被混合到交叉类型中其他构造函数签名的返回类型中.
 * 比如，交叉类型{ new(...args: any[]) => A } & { new(s: string) => B }仅有一个构造函数签名new(s: string) => A & B。
 * */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Person {
    constructor(name) {
        this.name = name;
    }
}
function Tagged(Base) {
    return class extends Base {
        constructor(...args) {
            super(...args);
            this._tag = "";
        }
    };
}
const TaggedPoint = Tagged(Point);
let point = new TaggedPoint(10, 20);
point._tag = "hello";
class Customer extends Tagged(Person) {
}
let customer = new Customer("Joe");
customer._tag = "test";
customer.accountBalance = 0;
/**
 * 另一个例子
 * */
{
    const WithLocation = (Base) => class extends Base {
        getLocation() {
            return [this.x, this.y];
        }
    };
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    const instance = new (WithLocation(Point))(1, 2);
}
export {};
//# sourceMappingURL=2.2%20%E6%94%AF%E6%8C%81%E6%B7%B7%E5%90%88%E7%B1%BB.js.map