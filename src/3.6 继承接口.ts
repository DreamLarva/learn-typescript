{
    /**
     * 继承接口
     * */
    interface Shape {
        color: string;
    }

    interface Square extends Shape {
        sideLength: number;
    }

    let square = <Square>{};
    square.color = "blue";
    square.sideLength = 10;
    square.sideLength = 11;
    // square.unKnown = ""; // Error
}

{
    /**
     * 继承多个接口
     * */
    interface Shape {
        color: string;
    }

    interface PenStroke {
        penWidth: number;
    }

    interface Square extends Shape, PenStroke {
        sideLength: number;
    }

    let square1 = <Square>{};
    square1.color = "blue";
    square1.sideLength = 10;
    square1.penWidth = 5.0;

    let square2 = <Square>{
        color: "blue",
        sideLength: 10,
        penWidth: 5.0
    };
}

export {}
