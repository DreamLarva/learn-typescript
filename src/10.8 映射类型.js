"use strict";
/** 映射类型 */
Object.defineProperty(exports, "__esModule", { value: true });
{
}
{
    // 等同于
    /*type Flags = {
        option1: boolean;
        option2: boolean;
    }*/
    let a = {
        option1: true,
        option2: true,
    };
    /**
     * 在这些例子里，属性列表是 keyof T且结果类型是 T[P]的变体。
     * 这是使用通用映射类型的一个好模版。 因为这类转换是 同态的，映射只作用于 T的属性而没有其它的。
     * 编译器知道在添加任何新属性之前可以拷贝所有存在的属性修饰符。
     * 例如，假设 Person.name是只读的，那么 Partial<Person>.name也将是只读的且为可选的。
     * */
}
{
    /**
     * 相当于给 参数o 每个都对应get 和set 方法
     * */
    function proxify(o) {
        let p = {};
        Object.keys((key) => {
            Object.assign(p, {
                get() {
                    return o[key];
                },
                set() {
                }
            });
        });
        return p;
    }
    let proxyProps = proxify({ a: 1 });
}
{
}
/** 由映射类型进行推断 */
{
    function unproxify(t) {
        let result = {};
        for (const k in t) {
            result[k] = t[k].get();
        }
        return result;
    }
    let originalProps = unproxify({});
}
//# sourceMappingURL=10.8 映射类型.js.map