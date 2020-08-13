/** TypeScript里的类型兼容性是基于结构子类型的。 */
{
    class Person {
    }
    let p;
    // OK, because of structural typing
    p = new Person();
    /**
     * 在使用基于名义类型的语言，比如C#或Java中，这段代码会报错，因为Person类没有明确说明其实现了Named接口。
     * TypeScript的结构性子类型是根据JavaScript代码的典型写法来设计的。
     * 因为JavaScript里广泛地使用匿名对象，例如函数表达式和对象字面量，所以使用结构类型系统来描述这些类型比使用名义类型系统更好。
     * */
}
{
    let x;
    // y's inferred type is { name: string; location: string; }
    let y = { name: 'Alice', location: 'Seattle' };
    x = y; // warning 但不报错 提示可能不符合
    console.log(x.name);
    // x.location // error x上声明的类型并没有 所以不能使用
    // x = {name:"name",location:"location"} // 老样子 字面量 不能有额外的属性
    /**
     * 这里要检查y是否能赋值给x，编译器检查x中的每个属性，看是否能在y中也找到对应属性。
     * 在这个例子中， y必须包含名字是name的string类型成员。y满足条件，因此赋值正确。
     * */
    console.log(x, y);
    function greet(n) {
        alert('Hello, ' + n.name);
        // alert(n.location) // Error 就只能使用Named 中的属性 name
    }
    greet(y); // OK
}
// a1 = a2; // error
a2 = a1; // a2 兼容 a1
//# sourceMappingURL=9.0 类型兼容性.js.map