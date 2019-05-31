/**
 * 合并单例类型，联合类型，类型保护和类型别名来创建一个叫做 可辨识联合的高级模式
 * 称做 标签联合或 代数数据类型
 *  具有普通的单例类型属性— 可辨识的特征。
 *  一个类型别名包含了那些类型的联合— 联合。
 *  此属性上的类型保护。
 * */

{
    interface Square {
        kind: "square";
        size: number;
    }

    interface Rectangle {
        kind: "rectangle";
        width: number;
        height: number;
    }

    interface Circle {
        kind: "circle";
        radius: number;
    }

    /**
     * 每个接口都有 kind属性但有不同的字符串字面量类型。 kind属性称做 可辨识的特征或 标签。
     *  其它的属性则特定于各个接口。 注意，目前各个接口间是没有联系的。
     * */

    type Shape = Square | Rectangle | Circle;

    let area = function (s: Shape) {
        switch (s.kind) { // 通过kind 辨识
            case "square":
                return s.size * s.size;
            case "rectangle":
                return s.height * s.width;
            case "circle":
                return Math.PI * s.radius ** 2;
        }
    }
}
{
    /** 完整性检查 */
    interface Square {
        kind: "square";
        size: number;
    }

    interface Rectangle {
        kind: "rectangle";
        width: number;
        height: number;
    }

    interface Circle {
        kind: "circle";
        radius: number;
    }

    interface Triangle {
        kind: "triangle";
        radius: number;
    }

    type Shape = Square | Rectangle | Circle | Triangle;
    let assertNever = function (x: Shape): never {
        throw new Error("Unexpected object: " + x);
    };
    let area = function (s: Shape): number {
        switch (s.kind) {
            case "square":
                return s.size * s.size;
            case "rectangle":
                return s.height * s.width;
            case "circle":
                return Math.PI * s.radius ** 2;
            /**
             * 没有Triangle 的类型方法 可能会返回 undefined
             * 需要一个 default 来确保类型
             * */
            default:
                return assertNever(s)

        }
    }
}

export {}
