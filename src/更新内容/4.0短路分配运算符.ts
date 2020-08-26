let a!: any;
let b!: any;

// 加
// a = a + b
a += b;

// 减
// a = a - b
a -= b;

// 乘
// a = a * b
a *= b;

// 除
// a = a / b
a /= b;

// 求幂
// a = a ** b
a **= b;

// 向左位移
// a = a << b
a <<= b;

/**
 * 新增的
 * */
// a = a && b;
a &&= b;

// a = a || b;
a ||= b;

// a = a ?? b;
a ??= b;
/**
 * 用法
 * */
{
  let values!: string[];
  // Before
  (values ?? (values = [])).push("hello");
}
{
  let values: string[];
  // After
  (values ??= []).push("hello");
}

{
  let obj!: any;
  let foo!: any;
  obj.prop ||= foo();

  // roughly equivalent to either of the following

  obj.prop || (obj.prop = foo());

  if (!obj.prop) {
    obj.prop = foo();
  }
}

{
  const obj = {
    get prop() {
      console.log("getter has run");

      // Replace me!
      return false;
    },
    set prop(_val: boolean) {
      console.log("setter has run");
    },
  };

  function foo() {
    console.log("right side evaluated");
    return true;
  }

  console.log("This one always runs the setter");
  obj.prop = obj.prop || foo();
  // 编译为 obj.prop = obj.prop || foo();

  console.log("This one *sometimes* runs the setter");
  obj.prop ||= foo();
  // 编译为 obj.prop || (obj.prop = foo());
  // 所以 当 obj.prop falsy 时 只会调用 getter 而不会调用 setter
}
export {};
