/**
 * 合并单例类型，联合类型，类型保护和类型别名来创建一个叫做 可辨识联合的高级模式
 * 称做 标签联合或 代数数据类型
 *  具有普通的单例类型属性— 可辨识的特征。
 *  一个类型别名包含了那些类型的联合— 联合。
 *  此属性上的类型保护。
 * */
{
    let area = function (s) {
        switch (s.kind // 通过kind 辨识
        ) {
            case "square":
                return s.size * s.size;
            case "rectangle":
                return s.height * s.width;
            case "circle":
                return Math.PI * s.radius ** 2;
        }
    };
}
{
    let assertNever = function (x) {
        throw new Error("Unexpected object: " + x);
    };
    let area = function (s) {
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
                return assertNever(s);
        }
    };
}
export {};
//# sourceMappingURL=10.5%20%E5%8F%AF%E8%BE%A8%E8%AF%86%E8%81%94%E5%90%88.js.map