import { Observable } from "./observable";
// import "./map";
// 虽然 不引入map 还是能够 提示 o.map 但是实际运行就会报错

let o: Observable<number> = new Observable<number>(1);
o.map(x => x.toFixed());
