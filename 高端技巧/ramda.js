import R from "ramda";
const students = ["A", "B", "C", "D", "E"];
const grades = [80, 100, 90, 99];
// const smartestStudent =(a:string[],b:number[]) =>  R.compose(
//     R.head,
//     R.pluck(0),
//     R.reverse,
//     R.sortBy(R.props(1)),
//     R.zip
// )
//
//
class Wrapper {
    constructor(value) {
        this._value = value;
    }
    map(f) {
        return f(this._value);
    }
    fmap(f) {
        return new Wrapper(f(this._value));
    }
}
const plus = R.curry((a, b) => a + b);
const plus3 = plus(3);
const two = new Wrapper(2);
const five = two.fmap(plus3);
class A {
    constructor() {
        this.a = 1;
    }
}
class B extends A {
}
let c;
let fun = () => c;
//# sourceMappingURL=ramda.js.map