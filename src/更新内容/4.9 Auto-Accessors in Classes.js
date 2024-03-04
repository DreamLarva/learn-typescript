"use strict";
/**
 * accessor 关键字
 * */
class Person {
    #name_accessor_storage;
    get name() { return this.#name_accessor_storage; }
    set name(value) { this.#name_accessor_storage = value; }
    constructor(name) {
        this.name = name;
    }
}
/* 编译后
class Person {
    #__name: string;
    get name() {
        return this.#__name;
    }
    set name(value: string) {
        this.#__name = value;
    }
    constructor(name: string) {
        this.name = name;
    }
}
* */
//# sourceMappingURL=4.9%20Auto-Accessors%20in%20Classes.js.map