import "reflect-metadata";

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

    new C().method()

}
console.log("----")
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

            constructor(...props: any[]) {
                super(props)
            }

            newMethod() {

            }
        }
    }

    @classDecorator
    class Greeter {
        property = "property";
        hello: string;

        constructor(m: string) {
            this.hello = m;
        }

        method() {

        }

    }

    /**
     * Greeter {
     *     property: 'property',
     *     hello: 'override',
     *     newProperty: 'new property'
     * }
     * 此处依然只能拿到 Greeter 类中的属性
     ***/
    console.log(new Greeter("world"));
    console.log(new Greeter("world").property);
    const a = new Greeter("1")
    // console.log(new Greeter("world").newProperty) // error
    /**
     * 所以在 类装饰器中
     * 添加任何 属性和方法都是没有意义的 最多只能覆盖掉 原来的类的同名内容
     * 新加的 在类型中是不能识别的
     * */

    /**
     * ??? 能做要的也就是依赖注入 参数中传递原来未知 但是装饰器中已知的内容
     * */
}
{
    /**
     * 方法装饰器
     * 在类的方法钱声明.将 装饰器的 Descriptor 应用到方法上
     * 可以 观察 修改 或者替换方法的声明
     * 方法修饰器 不能用于 声明文件 , 重载 in any other ambient context (such as in a declare class) ?
     *
     * 接受三个参数
     * 1. 构造函数 用于修改静态变量 或者 修改原型
     * 2. 方法的名字
     * 3. 成员的描述符
     * */
    function enumerable(value: boolean) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            descriptor.enumerable = value;
        };
    }

    class Greeter {
        greeting: string;

        constructor(message: string) {
            this.greeting = message;
        }

        @enumerable(false)
        greet() {
            return "Hello, " + this.greeting;
        }

    }

}
{
    /**
     * 访问器 修饰符 Accessor Decorators
     * 将 装饰器的 Descriptor 应用到访问器上
     * 可以 观察 修改 或者替换访问器的声明
     * 访问器修饰器 不能用于 声明文件 , 重载 in any other ambient context (such as in a declare class)
     *
     * typescript 不允许 同时 装饰 一个 成员的 get 和 set
     * 而是,将所有访问器修饰器 用于第一个访问器(从上到下的次序),这是因为  Property Descriptor 会同时作用于
     * get 和 set 而不是分开来声明
     *
     * 参数 : 与方法修饰器 相同也是三个
     *
     * es5 第三个参数 Descriptor 会为空
     * */
    function configurable(value: boolean) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            descriptor.configurable = value;
            // descriptor.writable = value;
        };
    }

    class Point {
        private readonly _y: number;

        constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }

        private _x: number;

        @configurable(false)
        get x() {
            return this._x;
        }

        // @configurable(false) // 报错 不能再同名 的访问器的 get 和 set 都使用装饰器
        set x(data) {
            this._x = data
        }

        @configurable(false)
        get y() {
            return this._y;
        }
    }

    const sample = new Point(1, 2);
    console.log(sample.x)
    // sample.x = 1234; // error

}

{
    /**
     * 属性 修饰符 Property Decorators
     * 将 装饰器的 Descriptor 应用到属性上
     * 可以 观察 修改 或者替换属性的声明
     * 属性修饰器 不能用于 声明文件 , 重载 in any other ambient context (such as in a declare class)
     *
     * 参数 : 两个
     *  1. 构造函数
     *  2. 属性的名字
     * */
    const formatMetadataKey = Symbol("format");

    function format(formatString: string) {
        // console.log(formatMetadataKey,formatString); // Symbol(format) 'Hello, %s'
        // console.log(Reflect.metadata(formatMetadataKey, formatString)); // [Function: decorator]

        return Reflect.metadata(formatMetadataKey, formatString);
    }

    function getFormat(target: any, propertyKey: string) {
        // console.log(Reflect.getMetadata(formatMetadataKey, target, propertyKey))
        return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
    }

    class Greeter {
        @format("Hello, %s")
        greeting: string;

        constructor(message: string) {
            this.greeting = message;
        }

        greet() {
            let formatString = getFormat(this, "greeting");
            return formatString.replace("%s", this.greeting);
        }
    }

    const instance = new Greeter("HaHa");
    // 获取挂载 属性 greeting 上面的元数据
    console.log(instance.greet()) // Hello, HaHa
}

{
    /**
     * 参数装饰器
     * 参数装饰器声明在一个参数声明之前（紧靠着参数声明）。 参数装饰器应用于类构造函数或方法声明。 参数装饰器不能用在声明文件（.d.ts），重载或其它外部上下文（比如 declare的类）里。
     *
     * 参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
     *
     * 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
     * 成员的名字。
     * 参数在函数参数列表中的索引。
     * 注意 参数装饰器只能用来监视一个方法的参数是否被传入。
     *
     * 参数装饰器的返回值会被忽略。
     * */
    const requiredMetadataKey = Symbol("required");

    function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
        let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
        existingRequiredParameters.push(parameterIndex);
        Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
    }

    function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<(name: string) => string>) {
        let method = descriptor.value;
        /**
         *  {
         *      value: [Function: greet],
         *      writable: true,
         *      enumerable: false,
         *      configurable: true
         *   }
         * */

        // console.log(descriptor);

        descriptor.value = function (...args) {
            let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
            // console.log(args.length); // 1
            if (requiredParameters) {
                for (let parameterIndex of requiredParameters) {
                    if (parameterIndex >= args.length || args[parameterIndex] === undefined) {
                        throw new Error("Missing required argument.");
                    }
                }
            }

            return method!.apply(this, args);
        }
    }

    class Greeter {
        greeting: string;

        constructor(message: string) {
            this.greeting = message;
        }

        @validate
        greet(@required name: string, other?: string) {
            return "Hello " + name + ", " + this.greeting;
        }
    }


    const instance = new Greeter("Agent47");
    // console.log(instance); // Greeter { greeting: 'Agent47' }

    // console.log(instance.greet("World","aaaa")); // Hello World, Agent47s
}


/**
 * metaData元数据
 * 需要这个库 reflect-metadata
 *
 * tsconfig 开启这两个
 * "experimentalDecorators": true,
 * "emitDecoratorMetadata": true
 *
 * metaData 参与的类型 不能有交叉 不能有联合 (交叉联合 会直接认为是 对象类型)
 * */
{
    class Point {
        constructor(public x: number, public y: number) {

        }
    }

    class Line1 {

        constructor(
            public _p0: Point,
            public _p1: Point
        ) {

        }

        get p0() {
            return this._p0;
        }

        @validate
        set p0(value: Point) {
            this._p0 = value;
        }


        get p1() {
            return this._p1;
        }

        @validate
        set p1(value: Point) {
            this._p1 = value;
        }
    }

    function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
        // 文档上为 let set = descriptor.set;
        //
        let set = descriptor.set;

        descriptor.set = function (value: T) {
            let type = Reflect.getMetadata("design:type", target, propertyKey);
            if (!(value instanceof type)) {
                throw new TypeError("Invalid type.");
            }
            set!(value);
        }
    }

    class Line2 {
        constructor(
            public  _p0: Point,
            public  _p1: Point,
        ) {}

        get p0() {
            return this._p0;
        }

        @validate
        @Reflect.metadata("design:type", Point)
        set p0(value: Point) {
            this._p0 = value;
        }


        get p1() {
            return this._p1;
        }

        @validate
        @Reflect.metadata("design:type", Point)
        set p1(value: Point) {
            this._p1 = value;
        }
    }


}
