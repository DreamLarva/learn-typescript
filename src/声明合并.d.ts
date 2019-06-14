/**
 * 合并命名空间
 * 对于命名空间里值的合并，如果当前已经存在给定名字的命名空间，那么后来的命名空间的导出成员会被加到已经存在的那个模块里。
 * */
declare namespace Animals {
    class Zebra {
    }
}
declare namespace Animals {
    /**
     * 非导出成员仅在其原有的（合并前的）命名空间内可见。这就是说合并之后，从其它命名空间合并进来的成员无法访问非导出成员。
     * */
    interface Legged {
        numberOfLegs: number;
    }
    class Dog {
    }
}
/**
 * 命名空间与类和函数和枚举类型合并
 * */
/** 命名空间 与 类 合并 */
declare class Album {
    label: Album.AlbumLabel;
    a(): void;
}
declare namespace Album {
    class AlbumLabel {
    }
}
/**
 *  合并结果是一个类并带有一个内部类。
 *  你也可以使用命名空间为类增加一些静态属性。
 * */
/**
 * 命名空间 与 函数合并
 *  TypeScript使用声明合并来达到这个目的并保证类型安全。
 * */
declare function buildLabel(name: string): string;
declare namespace buildLabel {
    let suffix: string;
    let prefix: string;
}
/**
 * 命名空间可以用来扩展枚举型
 * */
declare enum Color {
    red = 1,
    green = 2,
    blue = 4
}
declare namespace Color {
    function mixColor(colorName: string): number | undefined;
}
