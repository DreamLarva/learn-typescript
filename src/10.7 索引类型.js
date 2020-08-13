/**
 * 使用索引类型，编译器就能够检查使用了动态属性名的代码。
 * 例如，一个常见的JavaScript模式是从对象中选取属性的子集。
 * */
{
    /**
     *  T[K] 使用了 索引访问操作符
     *  泛型约束 K 必须为 T 的属性名组成的数组
     *  类型语法反映了表达式语法
     *  person['name']具有类型 Person['name'] — 在我们的例子里则为 string类型
     *  并且返回值必须 是T[K] 值的数组(有传入的对应的name对应T的值的类型)
     * */
    function pluck(o, names) {
        return names.map(n => o[n]);
    }
    pluck({ a: 1, b: "2" }, ["a"]);
    let person = {
        name: 'Jarid',
        age: 35
    };
    /**
     * 编译器会检查 name是否真的是 Person的一个属性。
     * 本例还引入了几个新的类型操作符。 keyof T， 索引类型查询操作符。
     * 对于任何类型 T， keyof T的结果为 T上已知的**公共属性名的联合**。*/
    let strings1 = pluck(person, ['name']); // ok, string[]
    // strings2 推断的类型 为 Person["name"|"age"][]
    let strings2 = pluck(person, ['name', "age"]);
    // 运行时并不存在
    let personProps; // 'name' | 'age'
    // console.log(personProps) // error 运行时不存在
    // pluck(person, ['age', 'unknown']); // error, 'unknown' is not in 'name' | 'age'
    /**
     * getProperty里的 o: T和 name: K，意味着 o[name]: T[K]。
     * 当你返回 T[K]的结果，编译器会实例化键的真实类型，因此 getProperty的返回值类型会随着你需要的属性改变。
     * */
    function getProperty1(o, name) {
        return o[name]; // o[name] is of type T[K]
    }
    let name = getProperty1(person, 'name');
    let age = getProperty1(person, 'age');
    // let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'
}
/** 索引类型和字符串索引签名 */
{
    let keys = "someString"; // 返回属性名的类型 string
    let value = 1234; // 返回属性值的类型 number
    let value2 = 1234; // 返回属性值的类型 number
}
{
    let keys = "2";
    // let keys2: keyof Map = "3";   // error Map中没有属性名为3
    let value = 1;
    let value1 = 1;
    // let value1: Map["2"] = "1"; // error Map中属性名为 "2" 的属性值 必须是number
}
/**
 * 对于数组类型同理
 * Array<T>[number] =  T
 * */
{
}
/**
 * 当然可以用 字符串联合类型 取出 值的 联合类型
 * */
{
}
//# sourceMappingURL=10.7 索引类型.js.map