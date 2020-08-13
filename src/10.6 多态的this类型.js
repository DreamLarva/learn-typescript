/**
 * 多态的 this类型表示的是某个包含类或接口的 子类型
 * */
{
    class BasicCalculator {
        constructor(value = 0) {
            this.value = value;
        }
        currentValue() {
            return this.value;
        }
        add(operand) {
            this.value += operand;
            return this;
        }
        multiply(operand) {
            this.value *= operand;
            return this;
        }
        minus(operand) {
            this.value -= operand;
            return this;
        }
    }
    let v = new BasicCalculator(2)
        .multiply(5)
        .add(1)
        .currentValue();
    /**
     * 由于这个类使用了 this类型，你可以继承它，新的类可以直接使用之前的方法，不需要做任何的改变。
     * */
    class ScientificCalculator extends BasicCalculator {
        constructor(value = 0) {
            super(value);
        }
        sin() {
            this.value = Math.sin(this.value);
            return this;
        }
        minus(operand) {
            super.minus(operand);
            return this;
        }
    }
    v = new ScientificCalculator(2)
        .sin()
        .multiply(5)
        .add(1)
        .minus(1)
        .currentValue();
    /**
     * 如果没有 this类型， ScientificCalculator就不能够在继承 BasicCalculator的同时还保持接口的连贯性。
     * multiply将会返回 BasicCalculator，它并没有 sin方法。
     * 然而，使用 this类型， multiply会返回 this，在这里就是 ScientificCalculator。
     * */
}
//# sourceMappingURL=10.6 多态的this类型.js.map