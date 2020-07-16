let foo!:any;
let bar!:any;
let defaultValue!:any;
let element!:any;
let otherElement!:any;

/**
* You can think of this feature - the ?? operator - as a way to “fall back” to a default value when dealing with null or undefined. When we write code like
 * 可以认为 ?? 操作符 是 在处理 null 或 undefined 回退到默认值的方法
 * ?? 操作符 同样只受到  undefined 和 null 的影响 而不受其他 falsy value 的影响
* */
{
    let x = foo ?? bar();
    // 翻译后
    // let x = (foo !== null && foo !== undefined) ?
    //     foo :
    //     bar();

    // 当然也可以多个
    let y = foo ?? bar() ?? bar();

    // foo? foo.bar : defaultValue
    // foo?.bar || defaultValue
    x = foo?.bar ?? defaultValue

    // if (foo.length > 3) {
    //     foo[2]
    // }
    x = foo?.[2]

    // let match = "#C0FFEE".match(/#([A-Z]+)/i);
    // let hex = match && match[1];
    // let hex = ("#C0FFEE".match(/#([A-Z]+)/i) || [,])[1];
    let hex = "#C0FFEE".match(/#([A-Z]+)/i)?.[1];


    // if (element.prepend) element.prepend(otherElement);
    element.prepend?.(otherElement);



}



export {}
