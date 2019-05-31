// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
// x = [10, 'hello']; // Error

console.log(x[0].substr(1)); // OK


// x[3] = 'world'; // error
// console.log(x[5].toString()); // error
//
// x[6] = true; // error

export {}
