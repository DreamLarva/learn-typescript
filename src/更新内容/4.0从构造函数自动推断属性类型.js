"use strict";
/**
 * TypeScript 4.0 can now use control flow analysis to determine the types of properties in classes when **noImplicitAny** is enabled.
 * */
{
    class Square {
        // ^ = (property) Square.sideLength: number
        constructor(sideLength) {
            this.sideLength = sideLength;
            this.area = sideLength ** 2;
        }
    }
}
/**
 * In cases where not all paths of a constructor assign to an instance member, the property is considered to potentially be undefined.
 * 如果不是所有分支 都有设置值 自然会判断为 可能是 undefined
 * */
{
    class Square {
        // ^ = (property) Square.sideLength: number | undefined
        constructor(sideLength) {
            if (Math.random()) {
                this.sideLength = sideLength;
            }
        }
    }
}
/**
 * In cases where you know better (e.g. you have an initialize method of some sort),
 * you’ll still need an explicit type annotation along with a definite assignment assertion (!) if you’re in **strictPropertyInitialization**.
 * 有 strictPropertyInitialization 配置的时候 使用 !断言 确保属性的类型,由写代码的人保证
 * */
{
    class Square {
        //         ^^^^^^^^
        // type annotation
        constructor(sideLength) {
            this.initialize(sideLength);
        }
        initialize(sideLength) {
            this.sideLength = sideLength;
        }
        get area() {
            return this.sideLength ** 2;
        }
    }
}
//# sourceMappingURL=4.0%E4%BB%8E%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E8%87%AA%E5%8A%A8%E6%8E%A8%E6%96%AD%E5%B1%9E%E6%80%A7%E7%B1%BB%E5%9E%8B.js.map