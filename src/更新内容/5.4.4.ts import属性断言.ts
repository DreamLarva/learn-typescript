import obj from "../../test.json" with { type: "json" };

// In some global file.
interface ImportAttributes {
    type: "json";
}
// 没报错 ??
// In some other module
import obj2 from "../../test.json" with { type: "not-json" };
//                                     ~~~~~~~~~~
// error!
//
// Type '{ type: "not-json"; }' is not assignable to type 'ImportAttributes'.
//  Types of property 'type' are incompatible.
//    Type '"not-json"' is not assignable to type '"json"'.

