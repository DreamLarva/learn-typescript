/**
 * static Blocks in Classes
 * 用于复杂的类初始化
 * https://github.com/tc39/proposal-class-static-block#ecmascript-class-static-initialization-blocks
 * */

// class Foo {
//     static count = 0;

//     // This is a static block:
//     static {
//         if (someCondition()) {
//             Foo.count++;
//         }
//     }
// }


// class Foo {
//     static #count = 0;

//     get count() {
//         return Foo.#count;
//     }

//     static {
//         try {
//             const lastInstances = loadLastInstances();
//             Foo.#count += lastInstances.length;
//         }
//         catch {}
//     }
// }


/*
// Prints:
//    1
//    2
//    3

class Foo {
    static prop = 1
    static {
        console.log(Foo.prop++);
    }
    static {
        console.log(Foo.prop++);
    }
    static {
        console.log(Foo.prop++);
    }
}
* */
