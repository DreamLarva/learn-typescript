"use strict";
/**
 * 另一种简化命名空间操作的方法是使用import q = x.y.z给常用的对象起一个短的名字。
 * 不要与用来加载模块的 import x = require('name')语法弄混了，这里的语法是为指定的符号创建一个别名。
 * 你可以用这种方法为任意标识符创建别名，也包括导入的模块中的对象。
 * */
var Shapes;
(function (Shapes) {
  let Polygons;
  (function (Polygons) {
    class Triangle {}
    Polygons.Triangle = Triangle;
    class Square {}
    Polygons.Square = Square;
  })((Polygons = Shapes.Polygons || (Shapes.Polygons = {})));
})(Shapes || (Shapes = {}));
console.log(Shapes);
var polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as "new Shapes.Polygons.Square()"
//# sourceMappingURL=12.3 别名.js.map
