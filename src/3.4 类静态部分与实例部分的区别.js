"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    /**
     * class 不能继承 有new 的接口
     * */
    // class Clock implements ClockConstructor {
    //     currentTime: Date;
    //     constructor(h: number, m: number) { }
    // }
}
{
    function createClock(ctor, hour, minute) {
        return new ctor(hour, minute);
    }
    class DigitalClock {
        tick() {
            console.log("beep beep");
        }
    }
    class AnalogClock {
        tick() {
            console.log("tick tock");
        }
    }
    let digital = createClock(DigitalClock, 12, 17);
    let analog = createClock(AnalogClock, 7, 32);
}
//# sourceMappingURL=3.4 类静态部分与实例部分的区别.js.map