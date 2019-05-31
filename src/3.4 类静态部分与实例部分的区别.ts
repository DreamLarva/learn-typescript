{
    /**
     * 当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。
     * 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误
     * */
    interface ClockConstructor {
        new(hour: number, minute: number): { hour: number; minute: number };
    }

    /**
     * class 不能继承 有new 的接口
     * */
    // class Clock implements ClockConstructor {
    //     currentTime: Date;
    //     constructor(h: number, m: number) { }
    // }
}

{
    /**
     * 这个接口的用处是
     * new 一个新的实例 参数为 hour minute
     * 并且返回的 是 实现 ClockInterface 接口的对象
     * */
    interface ClockConstructor {
        new(hour: number, minute: number): ClockInterface;
    }

    interface ClockInterface {
        tick(): void;
    }

    function createClock(
        ctor: ClockConstructor,
        hour: number,
        minute: number
    ): ClockInterface {
        return new ctor(hour, minute);
    }

    class DigitalClock implements ClockInterface {
        tick() {
            console.log("beep beep");
        }
    }

    class AnalogClock implements ClockInterface {
        tick() {
            console.log("tick tock");
        }
    }

    let digital = createClock(DigitalClock, 12, 17);
    let analog = createClock(AnalogClock, 7, 32);
}

export {}
