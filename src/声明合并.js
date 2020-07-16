"use strict";
/**
 * 合并接口
 * 最简单也最常见的声明合并类型是接口合并。 从根本上说，合并的机制是把双方的成员放到一个同名的接口里。
 * */
{
    let box = { height: 5, width: 6, scale: 10 };
}
/**
 * 对于函数成员，每个同名函数声明都会被当成这个函数的一个重载。 同时需要注意，
 * 当接口 A与后来的接口 A合并时，后面的接口具有更高的优先级。
 * */
{
    class Animal {
    }
    class Sheep extends Animal {
    }
    class Dog extends Animal {
    }
    class Cat extends Animal {
    }
    // 相当于
    /*
        interface Cloner {
            clone(animal: Dog): Dog;
            clone(animal: Cat): Cat;
            clone(animal: Sheep): Sheep;
            clone(animal: Animal): Animal;
        }
    */
}
/**
 * 这个规则有一个例外是当出现特殊的函数签名时。
 * 如果签名里有一个参数的类型是 单一的字符串字面量（比如，不是字符串字面量的联合类型），
 * 那么它将会被提升到重载列表的最顶端。
 * */
{
    // 等同于
    /*
        interface Document {
            createElement(tagName: "canvas"): HTMLCanvasElement;
            createElement(tagName: "div"): HTMLDivElement;
            createElement(tagName: "span"): HTMLSpanElement;
            createElement(tagName: string): HTMLElement;
            createElement(tagName: any): Element;
        }
    */
}
/**
 * 合并命名空间
 * 对于命名空间里值的合并，如果当前已经存在给定名字的命名空间，那么后来的命名空间的导出成员会被加到已经存在的那个模块里。
 * */
var Animals;
(function (Animals) {
    let a = 1;
    class Zebra {
    }
    Animals.Zebra = Zebra;
})(Animals || (Animals = {}));
(function (Animals) {
    class Dog {
    }
    Animals.Dog = Dog;
})(Animals || (Animals = {}));
// 等同于
/*
namespace Animals {
    export interface Legged { numberOfLegs: number; }

    export class Zebra { }
    export class Dog { }
}
*/
/**
 * 命名空间与类和函数和枚举类型合并
 * */
/** 命名空间 与 类 合并 */
class Album {
    a() {
        console.log(Album.AlbumLabel);
    }
}
(function (Album) {
    class AlbumLabel {
    }
    Album.AlbumLabel = AlbumLabel;
})(Album || (Album = {}));
/**
 *  合并结果是一个类并带有一个内部类。
 *  你也可以使用命名空间为类增加一些静态属性。
 * */
/* js
class Album {
}
(function (Album) {
    class AlbumLabel {
    }
    Album.AlbumLabel = AlbumLabel;
})(Album || (Album = {}));
* */
/**
 * 命名空间 与 函数合并
 *  TypeScript使用声明合并来达到这个目的并保证类型安全。
 * */
function buildLabel(name) {
    return buildLabel.prefix + name + buildLabel.suffix;
}
(function (buildLabel) {
    buildLabel.suffix = "";
    buildLabel.prefix = "Hello, ";
})(buildLabel || (buildLabel = {}));
console.log(buildLabel("Sam Smith"));
/**
 * 命名空间可以用来扩展枚举型
 * */
var Color;
(function (Color) {
    Color[Color["red"] = 1] = "red";
    Color[Color["green"] = 2] = "green";
    Color[Color["blue"] = 4] = "blue";
})(Color || (Color = {}));
(function (Color) {
    function mixColor(colorName) {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        }
        else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        }
        else if (colorName == "magenta") {
            return Color.red + Color.blue;
        }
        else if (colorName == "cyan") {
            return Color.green + Color.blue;
        }
    }
    Color.mixColor = mixColor;
})(Color || (Color = {}));
//# sourceMappingURL=声明合并.js.map