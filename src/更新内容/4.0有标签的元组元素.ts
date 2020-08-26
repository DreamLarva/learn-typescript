/**
 * Improving the experience around tuple types and parameter lists is important because it allows us to get strongly
 * typed validation around common JavaScript idioms - really just slicing and dicing argument lists and passing them to
 * other functions. The idea that we can use tuple types for rest parameters is one place where this is crucial.
 * */
{
    // 西面两个 函数想在相同
    function foo(...args: [string, number]): void {
        // ...
    }

    function foo2(arg0: string, arg1: number): void {
        // ...
    }

    foo("hello", 42);

    // foo("hello", 42, true); // Error
    // foo("hello"); // Error
}

/**
 * There is one place where the differences begin to become observable though: readability.
 * In the first example, we have no parameter names for the first and second elements.
 * While these have no impact on type-checking,
 * the lack of labels on tuple positions can make them harder to use - harder to communicate our intent.
 * */
{
    type Range = [start: number, end: number];
    /**
     * To deepen the connection between parameter lists and tuple types,
     * the syntax for rest elements and optional elements mirrors the syntax for parameter lists.
     * */
    type Foo = [first: number, second?: string, ...rest: any[]];

    /**
     * There are a few rules when using labeled tuples. For one, when labeling a tuple element, all other elements in the tuple must also be labeled.
     * */
    // type Bar = [first: string, number]; // Tuple members must all have names or all not have names.

    /**
     * 元组上的标签 不会影响解构
     * */
    function foo(x: [first: string, second: number]) {
        // ...

        // note: we didn't need to name these 'first' and 'second'
        const [a, b] = x;
        a
        //  ^ = const a: string
        b
        //  ^ = const b: number
    }
}

{

    type name =
        | [first:string,last:string]
        | [first:string,middle:string,last:string];
    function createPerson(...Name:name){

    }

    // 2020.2 webstorm 提示参数还是只能显示 ...Name:name
    // createPerson()
}
