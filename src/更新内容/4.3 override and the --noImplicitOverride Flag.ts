/**
 使用 --noImplicitOverride 编译选项后
 子类 使用与 父类的同名 方法 就必须使用 override 关键字
* */

class SomeComponent {
  show() {
    // ...
  }
  hide() {
    // ...
  }
}

class SpecializedComponent extends SomeComponent {
  override show() {
    // ...
  }
  override hide() {
    // ...
  }
}

class SpecializedComponent2 extends SpecializedComponent {
  override show() {
    // ...
  }
  // Error
  // override otherFun() {}
}
