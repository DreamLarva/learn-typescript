/**
 * 参数收集到一个变量里
 * 注意收集的变量一定是一个 数组
 * */
{
    function buildName(firstName, ...restOfName) {
        return firstName + " " + restOfName.join(" ");
    }
    console.log(buildName("Joseph", "Samuel", "Lucas", "MacKinzie"));
    function buildName1(firstName, ...restOfName) {
        return firstName + " " + restOfName.join(" ");
    }
    let buildNameFun = buildName1;
}
export {};
//# sourceMappingURL=5.2%20%E5%89%A9%E4%BD%99%E5%8F%82%E6%95%B0.js.map