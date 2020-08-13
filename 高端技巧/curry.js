const toCurry02 = (a, b, C) => true;
const curried02 = curryV0(toCurry02); // CurryV0<[string,number,boolean],boolean>
const test23 = curried02("Jane")(26)(true); // boolean
const curried03 = curryV0(toCurry02); // CurryV0<[string,number,boolean],boolean>
const curried04 = curried03("Jane"); // CurryV0<[number,boolean],boolean>
const curried05 = curried04(26); // CurryV0<[boolean],boolean>
const test24 = curried05(true); // boolean
/**
 * V1
 * */
const toCurry06 = (name, ages, ...nicknames) => true;
const curried06 = curryV0(toCurry06);
const toCurry07 = (name, age, ...nicknames) => true;
const curried07 = curryV1(toCurry06);
const test27 = curried07("jane", 26, "jj", "jini");
// 设计上有问题 参数没有按照次序消耗
const test28 = curried07("jane", 26, "jj")(26, "jj"); // should error
Array(20).fill(0).map(v => { });
Array.from({ length: 20 }).map(v => { });
//# sourceMappingURL=curry.js.map