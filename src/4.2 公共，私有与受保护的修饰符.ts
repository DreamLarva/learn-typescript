/**
 * C#要求必须明确地使用 public指定成员是可见的。 在TypeScript里，无前缀成员都默认为 public。
 *
 * TS 类中默认都是public 对其他类的成员可见(可实例化后调用,可在所在类的内部调用,可在子类中调用)
 * */

{
    // 默认所有对象的成员 都是 public 的
    class Animal1 {
        public name: string;

        public constructor(theName: string) {
            this.name = theName;
        }

        public move(distanceInMeters: number) {
            console.log(`${this.name} moved ${distanceInMeters}m.`);
        }
    }

    // 等同于
    class Animal2 {
        name: string;

        constructor(theName: string) {
            this.name = theName;
        }

        move(distanceInMeters: number) {
            console.log(`${this.name} moved ${distanceInMeters}m.`);
        }
    }
}
{
    /**
     * 当成员被标记成 private时，它就不能在声明它的类的外部访问。
     * 包括他的派生类
     * */
    class Animal {
        private name: string;

        constructor(theName: string) {
            this.name = theName
        }
    }

    // new Animal('Cat').name  // Error
}
{
    class Animal {
        private name: string;

        constructor(theName: string) {
            this.name = theName
        }
    }

    class Rhino extends Animal {
        constructor() {
            super("Rhino")
        }

        eat() {
            // super.name // Error 只能在声明的类的内部调用
        }
    }

    class Employee {
        private name: string;

        constructor(theName: string) {
            this.name = theName
        }
    }

    /**
     * 只要一个变量被赋值为一个有类型的声明的内容
     * 本身默认就会被声明为 同样的类型
     * */
    let animal = new Animal("Goat");
    let animal1: Animal = new Animal("Goat");
    /** 如果 Rhino 类没有 任何的方法和属性 就可以算作和Animal 一样的类型 */
        // let animal2:Rhino = new Animal("Goat"); // Error

    let rhino = new Rhino();
    let employee = new Employee("Bob");


    /** 虽然属性名相容 但是并不是Animal 中的那个private属性  所以不兼容 */
    // animal = employee; // Error

    /**
     * Rhino 使用了 继承来自 Animal 中 私有Name 所以是兼容的
     * */
    animal = rhino;

}

{
    /**
     * protected 修饰符与 private修饰符的行为很相似，
     * 但有一点不同， protected成员在只能在派生类 和自己中 中可以访问
     * */
    class Person {
        protected name: string;

        constructor(name: string) {
            this.name = name;
        }
    }

    class Person2 {
        protected name: string;

        constructor(name: string) {
            this.name = name;
        }
    }

    class Employee extends Person {
        private readonly department: string;

        constructor(name: string, department: string) {
            super(name);
            this.department = department;
        }

        public getElevatorPitch() {
            // 不过我自己还是建议 与来自基类的 成员互动的时候 还是使用 super 前缀更佳
            return `Hello, my name is ${super.name} and I work in ${this.department}.`;
        }
    }

    let howard = new Employee("Howard", "Sales");
    console.log(howard.getElevatorPitch())
    // console.log(howard.name) // Error

    // let person:Person2 = new Person("name") // Error protected 的非继承关系的类 当然不能兼容
}
{
    /**
     * 构造函数也可以被标记成 protected。
     * 这意味着这个类不能在包含它的类外被实例化，但是能被继承。
     * */
    class Person {
        protected name: string;

        protected constructor(theName: string) {
            this.name = theName;
        }
    }

    // Employee 能够继承 Person
    class Employee extends Person {
        private readonly department: string;

        constructor(name: string, department: string) {
            super(name);
            this.department = department;
        }

        public getElevatorPitch() {
            return `Hello, my name is ${this.name} and I work in ${this.department}.`;
        }
    }

    let howard = new Employee("Howard", "Sales");
    // let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.


}

export {}
