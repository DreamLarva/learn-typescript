class Animal {
  animalStuff: any;
}

class Dog extends Animal {
  dogStuff: any;
}
{
  type Getter<T> = () => T;
  // Getter<Dog> 给 Getter<Animal> 赋值 是ok 的, T应该符合协变(子类型都符合)
  let a = new Animal();
  let jsb = new Dog();
  let c: Getter<Animal> = () => new Animal();
  let d: Getter<Dog> = () => new Dog();

  // c = d;
  // d = c; // error

  type Setter<T> = (value: T) => void;
  // Setter<Dog> 给 Setter<Animal> 赋值 也是ok 的, T应该符合逆变(父类型都符合)
  let e = new Animal();
  let f = new Dog();
  let g: Setter<Animal> = (value) => {};
  let h: Setter<Dog> = (value) => {};

  // g = h; // error
  // h = g;

  // 但是 ts4.7 之前协变逆变 只要有推断关系 就可以
}

{
  // ts4.7 可以明确定义
  // out 协变 希望子类型
  type Getter<out T> = () => T;

  // in 协变 希望父类型
  type Setter<in T> = (value: T) => void;

  let a: Setter<Animal> = (v) => {};
  let b: Setter<Dog> = (v) => {};
  // a = b; // error
  b = a; // 希望父类型

  // in out 也可以同时用, 意义为 不变
  // State<T> 除非 T 相同, 否则不可以兼容
  interface State<in out T> {
    get: () => T;
    set: (value: T) => void;
  }
}

{
  // error
  // interface State<out T> { // 改成 in out 就ok了, 因为不能同时逆变 和 协变
  //   //          ~~~~~
  //   // error!
  //   // Type 'State<sub-T>' is not assignable to type 'State<super-T>' as implied by variance annotation.
  //   //   Types of property 'set' are incompatible.
  //   //     Type '(value: sub-T) => void' is not assignable to type '(value: super-T) => void'.
  //   //       Types of parameters 'value' and 'value' are incompatible.
  //   //         Type 'super-T' is not assignable to type 'sub-T'.
  //   get: () => T;
  //   set: (value: T) => void;
  // }
}

type Foo<T> = {
  x: T;
  f: Bar<T>;
};

type Bar<U> = (x: Baz<U[]>) => void;

type Baz<V> = {
  value: Foo<V[]>;
};

declare let foo1: Foo<unknown>;
declare let foo2: Foo<string>;

foo1 = foo2; // Should be an error but isn't ❌
// foo2 = foo1; // Error - correct ✅

type Foo2<in out T> = {
  x: T;
  f: Bar<T>;
};

declare let foo3: Foo2<unknown>;
declare let foo4: Foo2<string>;

// 泛型必须一致
// foo3 = foo4; // error
// foo4 = foo3; // error

