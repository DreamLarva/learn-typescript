{
    /**
     * 比较两个函数
     * */
    /**
     * 要查看x是否能赋值给y，首先看它们的参数列表。
     * x的每个参数必须能在y里找到对应类型的参数。
     * 注意的是参数的名字相同与否无所谓，只看它们的类型。
     * 这里， x的每个参数在y中都能找到对应的参数，所以允许赋值。
     * */
    {
        let x = (a) => 0;
        let y = (b, s) => 0;
        y = x; // OK
        // x = y; // Error
    }
    {
        /**
         * 常见的例子
         * 声明的多参数的函数 肯定兼容少参数的函数
         * */
        let items = [1, 2, 3];
        // Don't force these extra arguments
        items.forEach((item, index, array) => console.log(item));
        // Should be OK!
        items.forEach((item) => console.log(item));
    }
    {
        /** 类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型。 */
        let x = () => ({ name: 'Alice' });
        let y = () => ({ name: 'Alice', location: 'Seattle' });
        x = y; // OK
        // y = x; // Error because x() lacks a location property
    }
}
/**
 * @deprecated 函数参数双向协变
 * 现在 函数 在参数位置上抗变 在返回值位置协变
 * */
{
    let EventType;
    (function (EventType) {
        EventType[EventType["Mouse"] = 0] = "Mouse";
        EventType[EventType["Keyboard"] = 1] = "Keyboard";
    })(EventType || (EventType = {}));
    function listenEvent(eventType, handler) {
        /* ... */
    }
    // MouseEvent兼容Event  不稳妥, but useful and common
    // listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y)); // error 现在 e 的位置抗变 所以现在报错
    // 不推荐 在函数内容 指定参数的类型 Undesirable alternatives in presence of soundness
    listenEvent(EventType.Mouse, (e) => console.log(e.x + ',' + e.y));
    // 完整声明写法 泛型约束:函数必定兼容<(e: Event) => void>
    listenEvent(EventType.Mouse, ((e) => console.log(e.x + ',' + e.y))); // 能够正确推断 x,y
    // number 和 Event类型不兼容 Still disallowed (clear error). Type safety enforced for wholly incompatible types
    // listenEvent(EventType.Mouse, (e: number) => console.log(e));
}
{
    /** 可选参数以及剩余参数 */
    /**
     * 比较函数兼容性的时候，可选参数与必须参数是可互换的
     * 源类型上有额外的可选参数不是错误，目标类型的可选参数在源类型里没有对应的参数也不是错误。
     *
     * 当一个函数有剩余参数时，它被当做无限个可选参数。
     * */
    function invokeLater(args, callback) {
        /* ... Invoke callback with 'args' ... */
    }
    // 兼容但不稳妥 - 可能 不能提供参数 x 和 y 的参数
    invokeLater([1, 2], (x, y) => console.log(x + ', ' + y));
    // 如果兼容源类型的不定参数方法 如果有可能为空的参数 那么之后的参数也要有(?) 类型可能为空
    invokeLater([1, 2], (x, y) => console.log(x + ', ' + y));
    invokeLater([1, 2], (x, y) => {
        if (x) {
            // x.toFixed() // 正确推断
        }
        console.log(x + ', ' + y);
    });
}
{
    function invokeLater(args, callback) {
        /* ... Invoke callback with 'args' ... */
    }
    invokeLater([1, 2], () => console.log());
    invokeLater([1, 2], (x, y) => console.log(x + ', ' + y));
    // 虽然x 和 y 必有 但是你自己认为可能有 并不影响
    invokeLater([1, 2], (x, y) => console.log(x + ', ' + y));
}
{
    function foo(a, b) { }
    function invokeLater(args, callback) {
        /* ... Invoke callback with 'args' ... */
    }
    invokeLater([1, 2], foo); // 这里 foo 匹配的是 (a:number):number
}
// a = b; // error 回调函数 在 参数位置抗变
b = a;
//# sourceMappingURL=9.1 兼容 比较两个函数.js.map