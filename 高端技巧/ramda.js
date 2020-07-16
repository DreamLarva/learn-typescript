"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = __importDefault(require("ramda"));
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
const plus = ramda_1.default.curry((a, b) => a + b);
const plus3 = plus(3);
const two = new Wrapper(2);
const five = two.fmap(plus3);
//# sourceMappingURL=ramda.js.map