interface Animal {
  animalStuff: any;
}

interface Dog extends Animal {
  dogStuff: any;
}
{
  type Getter<T> = () => T;
  // Getter<Dog> 给 Getter<Animal> 赋值 是ok 的, T应该符合协变(子类型都符合)

  type Setter<T> = (value: T) => void;
  // Setter<Dog> 给 Setter<Animal> 赋值 也是ok 的, T应该符合逆变(父类型都符合)

  // 但是 ts4.7 之前协变逆变 只要有推断关系 就可以
}

{
  // ts4.7 可以明确定义
  // out 协变 希望子类型
  type Getter<out T> = () => T;

  // in 协变 希望父类型
  type Setter<in T> = (value: T) => void;

  // in out 也可以同时用, 意义为 不变
  // State<T> 除非 T 相同, 否则不可以兼容
  interface State<in out T> {
    get: () => T;
    set: (value: T) => void;
  }
}

{
  // error
  interface State<out T> {
    //          ~~~~~
    // error!
    // Type 'State<sub-T>' is not assignable to type 'State<super-T>' as implied by variance annotation.
    //   Types of property 'set' are incompatible.
    //     Type '(value: sub-T) => void' is not assignable to type '(value: super-T) => void'.
    //       Types of parameters 'value' and 'value' are incompatible.
    //         Type 'super-T' is not assignable to type 'sub-T'.
    get: () => T;
    set: (value: T) => void;
  }
}

type Foo<T> = {
  x: T;
  f: Bar<T>;
}

type Bar<U> = (x: Baz<U[]>) => void;

type Baz<V> = {
  value: Foo<V[]>;
}

declare let foo1: Foo<unknown>;
declare let foo2: Foo<string>;

foo1 = foo2;  // Should be an error but isn't ❌
foo2 = foo1;  // Error - correct ✅

/*
- type Foo<T> = {
+ type Foo<in out T> = {
      x: T;
      f: Bar<T>;
  }
* */
