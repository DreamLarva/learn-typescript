/**
 * 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。
 * 接口同样会继承到类的private和protected成员。
 * 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类(需要 extends)所实现（implement）。
 * */
{
    class Control {
    }
    class Button extends Control {
        select() {
            console.log(this.props);
            // this.state // error
        }
    }
    class TextBox extends Control {
        constructor() {
            super();
            this.props = 12345;
        }
        select() {
            console.log(this.props); // 可以使用 Control 类型中的 属性props
            // this.state // error 但不能使用 state
        }
    }
    /** 错误：“Image”类型缺少“state”属性。 必须extends Control 才行*/
    // class Image implements SelectableControl {
    //     public props: any;
    //     private state: any;
    //
    //     select() {
    //
    //     }
    // }
    //  可以 因为继承里 拥有私有属性的 Control 类
    class inheritControl extends Control {
        select() {
        }
    }
}
export {};
//# sourceMappingURL=3.8 接口继承类.js.map