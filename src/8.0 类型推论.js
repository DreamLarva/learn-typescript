"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    /** 基础*/
    let x = 3;
    // 凡是和x 有关(运算 赋值 等)的类型都会推断为number 类型
    // 相当于
    let x1 = 3;
}
{
    /**
     * 最佳通用类型
     * 当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型.
     * */
    let x = [0, 1, null];
    // 为了推断x的类型，我们必须考虑所有元素的类型。 这里有两种选择： number和null。 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。
    // 所以相当于
    let x1 = [0, 1, null];
    class Animal {
    }
    class Rhino extends Animal {
    }
    class Elephant extends Animal {
    }
    class Snake extends Animal {
    }
    let zoo = [new Rhino(), new Elephant(), new Snake()];
    // 默认推断为
    let zoo1 = [new Rhino(), new Elephant(), new Snake()];
    // 如果想要重新推断为 父类就要重新声明类型
    let zoo2 = [new Rhino(), new Elephant(), new Snake()];
    // 如果没有 父类声明 这里依然是 联合类型
    function createZoo() {
        return [new Rhino(), new Elephant(), new Snake()];
    }
}
{
    /**  上下文类型 */
    window.onmousedown = function (mouseEvent) {
        // 已经推断了为mouse的Event类型
        console.log(mouseEvent.button);
    };
    /**
     * */
    document.getElementById("test").addEventListener("keydown", function (e) {
        // 推断为 按键的Event类型
        console.log(e.altKey);
    });
}
//# sourceMappingURL=8.0 类型推论.js.map