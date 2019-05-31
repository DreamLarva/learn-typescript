/**
 * 函数类型
 * 接口也可以用来来描述函数的类型
 * 注意 如果函数没有指明 类型 就默认设置为 any
 * */
interface SearchFunc {
    (source: string, subString: string,
     // [propName]:any // 这句话可以无视参数数量
    ): boolean
}


let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) { // subString原来为 any 现在为 string  兼容
    let result = source.search(subString);
    return result > -1;
};


/**
 * 用type 关键字 定义函数类型
 * */
type SearchFuncType = (source: string, subString: string) => boolean
let mySearch2: SearchFuncType = function (source, subString) {
    let result = source.search(subString);
    return result > -1;
};


/**
 * 函数参数 接口里定义的名字相不需要匹配 只要次序对就行
 * */
let mySearch1: SearchFunc;
mySearch1 = function (src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
};

let mySearch3: SearchFunc;
mySearch = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
};

export {}
