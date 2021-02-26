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
    let bar = Math.random() < 0.5 ? { a: true, aData: 100 } : { b: true, bData: "hello" };
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
export {};
//# sourceMappingURL=2.7%20%E6%9B%B4%E6%99%BA%E8%83%BD%E7%9A%84%E5%AF%B9%E8%B1%A1%E5%AD%97%E9%9D%A2%E9%87%8F%E6%8E%A8%E6%96%AD.js.map