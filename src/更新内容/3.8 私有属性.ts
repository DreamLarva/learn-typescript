/**
 * 不同于 普通的属性(即使是 有private 修饰符), # 修饰符也有规则值得注意:
 * 每个 #属性名 在所属class 中唯一
 * 已经有# 修饰符的 不能再 添加 private 或者 public
 * # 属性不能 在所属class 之外被 读取 - 即使是编译成js 后也是如此,这杯叫做 强隐私?(hard privacy)
 * #属性还有一个 好处就是 #属性 是独特的. 例如 常规属性声明易于在子类中被覆盖。
 *
 * */

class Person {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}!`);
  }
}

let jeremy = new Person("Jeremy Bearimy");

// jeremy.#name; // error

class C {
  foo = 10;

  cHelper() {
    return this.foo;
  }
}

class D extends C {
  foo = 20;

  dHelper() {
    return this.foo;
  }
}

let instance = new D();
// 'this.foo' refers to the same property on each instance.
console.log(instance.cHelper()); // prints '20'
console.log(instance.dHelper()); // prints '20'

class E {
  #foo = 10;

  cHelper() {
    return this.#foo;
  }
}

class F extends E {
  #foo = 20;

  dHelper() {
    return this.#foo;
  }
}

let instance1 = new F();
// 'this.#foo' refers to a different field within each class.
// 每个 'this.#foo' 都指向其所在作用的 class 内的对应属性
console.log(instance1.cHelper()); // prints '10'
console.log(instance1.dHelper()); // prints '20'

class Square {
  #sideLength: number;

  constructor(sideLength: number) {
    this.#sideLength = sideLength;
  }

  equals(other: any) {
    return this.#sideLength === other.#sideLength;
  }
}
//
const a = new Square(100);
const b = { sideLength: 100 };
const c = new Square(101);

// 运行时报错
// TypeError: attempted to get private field on non-instance
// This fails because 'b' is not an instance of 'Square'.
// console.log(a.equals(b));

console.log(a.equals(c)); // ok




declare function smushObjects<T, U>(x: T, y: U): T & U;

interface Circle {
    // kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

declare let x: Circle;
declare let y: Square;

let z = smushObjects(x, y);
console.log(z.kind);



export {};
