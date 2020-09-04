import { Observable } from "./observable";

// 在这里 声明 将要拓展一个方法
// 这样 才能 提示 o.map 方法
// 但是 不是实际引入 本文件 也有 提示 在实际运行会出问题
declare module "./observable" {
  interface Observable<T> {
    map<U>(f: (x: T) => U): Observable<U>;
  }
}
Observable.prototype.map = function <U>(f: (x: any) => U): Observable<U> {
  return new Observable<U>(f(this.val));
};
