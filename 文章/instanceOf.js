// 判断 foo 是否是 Foo 类的实例
{
  function Foo() {}
  var foo = new Foo();
  console.log(foo instanceof Foo); // true
}

// 判断 foo 是否是 Foo 类的实例 , 并且是否是其父类型的实例
{
  function Aoo() {}
  function Foo() {}
  Foo.prototype = new Aoo(); //JavaScript 原型继承

  var foo = new Foo();
  console.log(foo instanceof Foo); //true
  console.log(foo instanceof Aoo); //true
}

// instanceof 复杂用法
{
  console.log("*** instanceof 复杂用法 ***");
  console.log(Object instanceof Object); // true
  console.log(Function instanceof Function); // true
  console.log(Number instanceof Number); // false
  console.log(String instanceof String); // false
  console.log(Function instanceof Object); // true
  console.log(Error instanceof Error); // false
  console.log(Foo instanceof Function); // true
  console.log(Foo instanceof Foo); // false
  console.log(new Error() instanceof Error); // true
}

/*
详细剖析 ECMAScript-262 edition 3 中 instanceof 运算符的定义
11.8.6 The instanceof operator
 The production RelationalExpression:
     RelationalExpression instanceof ShiftExpression is evaluated as follows:

 1. Evaluate RelationalExpression.
 2. Call GetValue(Result(1)).// 调用 GetValue 方法得到 Result(1) 的值，设为 Result(2)
 3. Evaluate ShiftExpression.
 4. Call GetValue(Result(3)).// 同理，这里设为 Result(4)
 5. If Result(4) is not an object, throw a TypeError exception.// 如果 Result(4) 不是 object,抛出异常

如果 Result(4) 没有 [[HasInstance]] 方法，抛出异常。规范中的所有 [[...]] 方法或者属性都是内部的，
在 JavaScript 中不能直接使用。并且规范中说明，只有 Function 对象实现了 [[HasInstance]] 方法。
所以这里可以简单的理解为：如果 Result(4) 不是 Function 对象，抛出异常
 6. If Result(4) does not have a [[HasInstance]] method,
   throw a TypeError exception.
 // 相当于这样调用：Result(4).[[HasInstance]](Result(2))
 7. Call the [[HasInstance]] method of Result(4) with parameter Result(2).
 8. Return Result(7).




 // 相关的 HasInstance 方法定义
 15.3.5.3 [[HasInstance]] (V)
 Assume F is a Function object. // 这里 F 就是上面的 Result(4)，V 是 Result(2)
 When the [[HasInstance]] method of F is called with value V,
 the following steps are taken:
   1. If V is not an object, return false.// 如果 V 不是 object，直接返回 false
   2. Call the [[Get]] method of F with property name "prototype".// 用 [[Get]] 方法取 F 的 prototype 属性
   3. Let O be Result(2).// O = F.[[Get]]("prototype")
   4. If O is not an object, throw a TypeError exception.
   5. Let V be the value of the [[Prototype]] property of V. // V = V.[[Prototype]]
   6. If V is null, return false.
   // 这里是关键，如果 O 和 V 引用的是同一个对象，则返回 true；否则，到 Step 8 返回 Step 5 继续循环
   7. If O and V refer to the same object or if they refer to objects
     joined to each other (section 13.1.2), return true.
   8. Go to step 5.
* */

// JavaScript instanceof 运算符代码
{
  function instance_of(L, R) {
    //L 表示左表达式，R 表示右表达式
    var O = R.prototype; // 取 R 的显示原型
    L = L.__proto__; // 取 L 的隐式原型
    while (true) {
      if (L === null) return false;
      if (O === L)
        // 这里重点：当 O 严格等于 L 时，返回 true
        return true;
      L = L.__proto__;
    }
  }

  // ts 编译的ES5 class 继承代码
  var __extends =
    (this && this.__extends) ||
    (function () {
      var extendStatics = function (d, b) {
        extendStatics =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (d, b) {
              d.__proto__ = b;
            }) ||
          function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          };
        return extendStatics(d, b);
      };
      return function (d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype =
          b === null
            ? Object.create(b)
            : ((__.prototype = b.prototype), new __());
      };
    })();

  var A = /** @class */ (function (_super) {
    __extends(A, _super);
    function A() {
      console.log("super", _super);
      console.log("super", _super.apply(this, arguments));
      // 注意此处 会判断 _super 执行后有没有返回值 如果有则直接替代原来的this
      // 所以这里生产实例的时候 Error 实例 直接替代了原来的
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    return A;
  })(Error);

  const a = new A();
  console.log("es5 继承 native 对象");
  console.log("a.__proto__", a.__proto__); // Error {}
  console.log("a.__proto__.__proto__", a.__proto__.__proto__); // {}
  console.log("A.prototype", A.prototype); // 指向构造函数 [A [Error]] { constructor: [Function: A] }
  console.log("A.prototype.prototype", A.prototype.prototype); // undefined
  // 已经不可能相等了
  console.log(instance_of(a, A)); // false

  function C() {}
  var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
      console.log("super", _super);
      console.log("super", _super.apply(this, arguments));
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    return D;
  })(C);
  const d = new D();
  console.log("es5 继承 非native 对象");
  console.log("d.__proto__", d.__proto__); // 指向构造函数 { constructor: [Function: D] }
  console.log("d.__proto__.__proto__", d.__proto__.__proto__); // {}
  console.log("D.prototype", D.prototype); // 指向构造函数  { constructor: [Function: D] }
  console.log("D.prototype.prototype", D.prototype.prototype); // undefined
  // 已经不可能相等了
  console.log(instance_of(d, D)); // false

  console.log("es6 继承");
  class B extends Error {}
  const b = new B();
  console.log("b.__proto__", b.__proto__); // 指向构造函数 [B [Error]]
  console.log("B.prototype", B.prototype); // 指向构造函数 [B [Error]]
  console.log(instance_of(b, B)); // true
}
{
  function A() {}
  Object.setPrototypeOf(A, Error);
  console.log(A.prototype);
  const a = new A();
  console.log(a.__proto__);
}
