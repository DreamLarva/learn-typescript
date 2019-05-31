{
    /** 普通实现*/
    interface ClockInterface {
        currentTime: Date;
    }

    class Clock implements ClockInterface {
        currentTime: Date = new Date();

        constructor(h: number, m: number) {
        }
    }
}

{
    /** 描述方法 */
    interface ClockInterface {
        currentTime: Date;

        setTime(d: Date): void
    }

    class Clock implements ClockInterface {
        currentTime: Date = new Date();

        constructor(h: number, m: number) {
        }

        setTime(d: Date) {

        }

    }
}

export {}
