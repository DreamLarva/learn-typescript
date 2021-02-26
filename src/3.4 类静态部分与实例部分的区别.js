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
export {};
//# sourceMappingURL=3.4%20%E7%B1%BB%E9%9D%99%E6%80%81%E9%83%A8%E5%88%86%E4%B8%8E%E5%AE%9E%E4%BE%8B%E9%83%A8%E5%88%86%E7%9A%84%E5%8C%BA%E5%88%AB.js.map