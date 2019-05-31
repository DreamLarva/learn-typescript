declare const System: any;

import { ZipCodeValidator as Zip } from "./ZipCodeValidator";

if (true) {
    System.import("./ZipCodeValidator").then((ZipCodeValidator: typeof Zip) => {
        var x = new ZipCodeValidator();
        if (x.isAcceptable("...")) { /* ... */ }
    });
}