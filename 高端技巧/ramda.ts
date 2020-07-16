import R from "ramda";
import type { zip } from "ramda";
import { KeyValuePair } from "ramda/tools";
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

class Wrapper<T> {
  _value: T;
  constructor(value: T) {
    this._value = value;
  }

  map<K>(f: (fst: T) => K) {
    return f(this._value);
  }
  fmap<K>(f: (fst: T) => K) {
    return new Wrapper(f(this._value));
  }
}

const plus = R.curry((a: number, b: number) => a + b);
const plus3 = plus(3);
const two = new Wrapper(2);
const five = two.fmap(plus3);

abstract class A<T = any> {
  a: 1 = 1;
  b!: T;
}

class B extends A {
  c!: 2;
}

let c: B;
let fun = (): A => c;
