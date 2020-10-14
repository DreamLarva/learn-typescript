/**
 * 另一种简化命名空间操作的方法是使用import q = x.y.z给常用的对象起一个短的名字。
 * 不要与用来加载模块的 import x = require('name')语法弄混了，这里的语法是为指定的符号创建一个别名。
 * 你可以用这种方法为任意标识符创建别名，也包括导入的模块中的对象。
 * */
declare namespace Shapes {
  namespace Polygons {
    class Triangle {}
    class Square {}
  }
}
import polygons = Shapes.Polygons;
declare let sq: polygons.Square;
