
/**
 * 使用ts的枚举不可以使用 Symbol类型
 * */
{
    /**
     * 数字枚举
     * 是一个在运行后会存在的变量
     * */
    enum test1 {
        Up,
        Down,
        Left,
        Right,
    }
    /*{ '0': 'Up',
        '1': 'Down',
        '2': 'Left',
        '3': 'Right',
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3 }*/

    /**
     * 自增
     * 如果被赋值为数字 那么之后的赋值就会自增
     * */
    enum test2 {
        Up = 9,
        Down,
        Left,
        Right,
    }
   /* { '9': 'Up',
        '10': 'Down',
        '11': 'Left',
        '12': 'Right',
        Up: 9,
        Down: 10,
        Left: 11,
        Right: 12 }*/

   /**
    * 如果给非 第一个内容赋值为 一个数字赋值为数字
    * 那么第一个依然从0 开始自增
    * 可能会与后面赋值为 数字的 可能出现 相同的值
    * */
    enum test3 {
        Up,
        Down,
        Left = 1,
        Right,
    }
    /*{ '0': 'Up',
        '1': 'Left',
        '2': 'Right',
        Up: 0,
        Down: 1,
        Left: 1,
        Right: 2 }*/

}

{
    /** 字符串枚举 */
    enum Direction {
        Up = "UP",
        Down = "DOWN",
        Left = "LEFT",
        Right = "RIGHT",
    }
}

export {}
