/**
 * 检查一个私有属性 是否在另一个 对象上也有
 * 使用 in 操作符
 * */

class Person {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  equals(other: unknown) {
    if (other &&
      typeof other === "object" && #name in other) {
      console.log(this.#name, other.#name)

    }
    return other &&
      typeof other === "object" &&
      #name in other && // <- this is new!
      this.#name === other.#name;
  }
}

class Other {
  #name: string;

  constructor(name: string) {
    this.#name = name
  }
}


class OtherPerson extends Person {
  #name: string

  constructor(name: string) {
    super("abc"); // <- 注意这里不一样
    this.#name = name
  }
}

const p1 = new Person("abc");
const p2 = new Other("abc");
const p3 = new OtherPerson("123");

console.log(p1.equals(p1)) // true
console.log(p1.equals(p2)) // false
console.log(p1.equals(p3)) // true


/**
 *  #name in other 表示 other 一定也是 构造为 Person
 *  否则没有其他地方不存在 该字段
 * */


export {}
