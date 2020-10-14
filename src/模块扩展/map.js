import { Observable } from "./observable";
Observable.prototype.map = function (f) {
  return new Observable(f(this.val));
};
//# sourceMappingURL=map.js.map
