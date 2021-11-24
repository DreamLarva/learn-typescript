let passCode = "secret passcode";

/**
 * 只带有 get不带有 set的存取器自动被推断为 readonly
 * */
class Employee {
  constructor(fullName?: string) {
    this._fullName = fullName;
  }

  private _fullName: string | undefined; //  ? 可以去掉

  get fullName(): string {
    return <string>this._fullName;
  }

  set fullName(newName: string) {
    if (passCode && passCode === "secret passcode") {
      this._fullName = newName;
    } else {
      console.log("Error,Unauthorized update of employee!");
    }
  }
}

let employee: Employee;
employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  alert(employee.fullName);
}

export {};
