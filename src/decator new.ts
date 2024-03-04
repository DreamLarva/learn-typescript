/**
 * from TS 5.0
 *
 * https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators
 *
 * https://github.com/microsoft/TypeScript/pull/50820
 * */
function decorate(str: string) {
  console.log(`EVALUATE @decorate(): ${str}`);
  return function loggedMethod(
    originalMethod: any,
    context: ClassMethodDecoratorContext
  ) {
    const methodName = String(context.name);

    function replacementMethod(this: any, ...args: any[]) {
      console.log(`LOG: Entering method '${methodName}'.`);
      const result = originalMethod.call(this, ...args);
      console.log(`LOG: Exiting method '${methodName}'.`);
      return result;
    }

    return replacementMethod;
  };
}
function log(str: string) {
  console.log(str);
  return str;
}

// @decorate("class")
class TheClass {
  // @decorate("static field")
  static staticField = log("static field value");

  // 这个格式 只能用在方法上
  @decorate("prototype method")
  [log("computed key")]() {}

  // @decorate("instance field")
  instanceField = log("instance field value");
  // This initializer only runs if we instantiate the class
}

function loggedMethod(headMessage = "LOG:") {
  return function actualDecorator(
    originalMethod: any,
    context: ClassMethodDecoratorContext
  ) {
    const methodName = String(context.name);

    function replacementMethod(this: any, ...args: any[]) {
      console.log(`${headMessage} Entering method '${methodName}'.`);
      const result = originalMethod.call(this, ...args);
      console.log(`${headMessage} Exiting method '${methodName}'.`);
      return result;
    }

    return replacementMethod;
  };
}
function bound(originalMethod: any, context: ClassMethodDecoratorContext<any>) {
  const methodName = context.name;
  if (context.private) {
    throw new Error(
      `'bound' cannot decorate private properties like ${methodName as string}.`
    );
  }
  context.addInitializer(function () {
    this[methodName] = this[methodName].bind(this);
  });
}
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @bound
  @loggedMethod("⚠️")
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

const p = new Person("Ron");
p.greet();

export {};
