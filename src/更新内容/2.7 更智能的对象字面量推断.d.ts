/**
 * 从2.7版本开始，TypeScript会“规范化”每个对象字面量类型记录每个属性，
 * 为每个 undefined类型属性插入一个可选属性，并将它们联合起来。
 * */
declare let someTest: boolean;
/**
 * 非字面量 就不行
 * */
declare let bar1: {
    a: true;
    aData: 100;
};
declare let bar2: {
    b: true;
    bData: "hello";
};
declare let bar: {
    a: true;
    aData: 100;
} | {
    b: true;
    bData: "hello";
};
