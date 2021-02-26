/**
 * 泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。
 * */
{
    class GenericNumber {
    }
    let myGenericNumber = new GenericNumber();
    /**
     * 设置了 number 类型后
     * zeroValue属性 和 add 的 参数 x y 都是 number 类型
     * */
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function (x, y) {
        return x + y;
    };
    let stringNumeric = new GenericNumber();
    stringNumeric.zeroValue = "";
    stringNumeric.add = function (x, y) {
        return x + y;
    };
    console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
}
export {};
//# sourceMappingURL=6.3%20%E6%B3%9B%E5%9E%8B%E7%B1%BB.js.map