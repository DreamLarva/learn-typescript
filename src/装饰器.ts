/**
 * 装饰器
 * tsconfig.json里启用experimentalDecorators编译器选项
 * 装饰器的 执行顺序 为 从上到下 从左到右
 * */
{
    function f() {
        console.log("f(): evaluated");
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            console.log(target, propertyKey, descriptor);
            console.log("f(): called");
        }
    }

    function g() {
        console.log("g(): evaluated");
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            console.log(target, propertyKey, descriptor);
            console.log("g(): called");
        }
    }


    class C {
        @f()
        @g()
        @f() @g()
        method() {
        }
    }

}

/**
 * 装饰器求值
 * 类中不同声明上的装饰器将按以下规定的顺序应用：
 *      1.参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
 *      2.参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
 *      3.参数装饰器应用到构造函数。
 *      4.类装饰器应用到类。
 * */
{
}

/**
 * 类装饰器的 执行内容
 * 类装饰器在类声明之前被声明（紧靠着类声明）。
 * 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。
 * 类装饰器不能用在声明文件中( .d.ts)，也不能用在任何外部上下文中（比如declare的类）。
 *
 * 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
 * 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
 *
 * * 注意  如果你要返回一个新的构造函数，你必须注意处理好原来的原型链。 在运行时的装饰器调用逻辑中 不会为你做这些。
 * */
{
    function decorator<T>(target: T): T {
        return target
    }

    @decorator
    class Test1 {
    }

    // 相当于

    class Test2 {
    }

    decorator(Test2);


    // 密封此类的构造函数和原型
    function sealed(constructor: Function) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    }

    @sealed
    class Greeter {
        greeting: string;

        constructor(message: string) {
            this.greeting = message;
        }

        greet() {
            return "Hello, " + this.greeting;
        }
    }
}
{
    // function classDecorator<T extends {new(...args:any[]):{greeting:string,greet:()=>string}}>(constructor:T) {
    // 约束 泛型T 也就会参数 必须是 一个类(注意并不是一个实例)
    function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {

        return class extends constructor {
            newProperty = "new property";
            hello = "override";
        }
    }

    @classDecorator
    class Greeter {
        property = "property";
        hello: string;

        constructor(m: string) {
            this.hello = m;
        }
    }

    console.log(new Greeter("world"))
}

