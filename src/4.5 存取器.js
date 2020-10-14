let passCode = "secret passcode";
/**
 * 只带有 get不带有 set的存取器自动被推断为 readonly
 * */
class Employee {
  constructor(fullName) {
    this._fullName = fullName;
  }
  get fullName() {
    return this._fullName;
  }
  set fullName(newName) {
    if (passCode && passCode === "secret passcode") {
      this._fullName = newName;
    } else {
      console.log("Error,Unauthorized update of employee!");
    }
  }
}
let employee;
employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  alert(employee.fullName);
}
export {};
//# sourceMappingURL=4.5 存取器.js.map
