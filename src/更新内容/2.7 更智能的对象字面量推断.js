{
    // foo的最类型是 { value: number } | { value?: undefined }
    let foo = someTest ? { value: 42 } : {};
    // vsc 推断正确 但是 webstorm 推断为 {}
    // 使用上都还是正确额的
    foo.value; // foo.value 推断为 number | undefined
}
{
    // Has type
    //  | { a: boolean, aData: number, b?: undefined }
    //  | { b: boolean, bData: string, a?: undefined }
    let bar = Math.random() < 0.5 ?
        { a: true, aData: 100 } :
        { b: true, bData: "hello" };
    if (bar.b) {
        // TypeScript now knows that 'bar' has the type
        //
        //   '{ b: boolean, bData: string, a?: undefined }'
        //
        // so it knows that 'bData' is available.
        bar.bData.toLowerCase();
    }
}
let bar = Math.random() < 0.5 ? bar1 : bar2;
// error
// if (bar.b) {
//     bar.bData.toLowerCase()
// }
/**
 * 非字面量 就不行
 * */
{
    let bar;
    // if (bar.b) { // error
    //     bar.bData.toLowerCase() //error
    // }
}
//# sourceMappingURL=2.7 更智能的对象字面量推断.js.map