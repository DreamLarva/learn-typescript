/**
 * 多态的 this类型表示的是某个包含类或接口的 子类型
 * */
{
  class BasicCalculator {
    public constructor(protected value: number = 0) {}

    public currentValue(): number {
      return this.value;
    }

    public add(operand: number): this {
      this.value += operand;
      return this;
    }

    public multiply(operand: number): this {
      this.value *= operand;
      return this;
    }

    protected minus(operand: number): this {
      this.value -= operand;
      return this;
    }
  }

  let v = new BasicCalculator(2).multiply(5).add(1).currentValue();

  /**
   * 由于这个类使用了 this类型，你可以继承它，新的类可以直接使用之前的方法，不需要做任何的改变。
   * */
  class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
      super(value);
    }

    public sin() {
      this.value = Math.sin(this.value);
      return this;
    }

     public override minus(operand: number): this {
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

export {};
