/*
 * @Author: YangJiaqi
 * @Date: 2019-11-26 15:12:02
 * @Company: orientsec.com.cn
 * @Description:
 */
/**
 * 枚举的一个很好用途是使用枚举作为标志。这些标志允许你检查一组条件中的某个条件是否为真
 * 考虑如下代码例子，我们有一组关于 animals 的属性：
 * */
var AnimalFlags;
(function (AnimalFlags) {
    AnimalFlags[AnimalFlags["None"] = 0] = "None";
    AnimalFlags[AnimalFlags["HasClaws"] = 1] = "HasClaws";
    AnimalFlags[AnimalFlags["CanFly"] = 2] = "CanFly";
    AnimalFlags[AnimalFlags["EatsFish"] = 4] = "EatsFish";
    AnimalFlags[AnimalFlags["Endangered"] = 8] = "Endangered";
    AnimalFlags[AnimalFlags["EndangeredFlyingClawedFishEating"] = 15] = "EndangeredFlyingClawedFishEating";
})(AnimalFlags || (AnimalFlags = {}));
function printAnimalAbilities(animal) {
    var animalFlags = animal.flags;
    if (animalFlags & AnimalFlags.HasClaws) {
        console.log("animal has claws");
    }
    if (animalFlags & AnimalFlags.CanFly) {
        console.log("animal can fly");
    }
    if (animalFlags == AnimalFlags.None) {
        console.log("nothing");
    }
}
var animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal); // animal has claws
animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal); // animal has claws, animal can fly
export {};
//# sourceMappingURL=%E4%BD%BF%E7%94%A8%E6%95%B0%E5%AD%97%E7%B1%BB%E5%9E%8B%E4%BD%9C%E4%B8%BA%E6%A0%87%E5%BF%97.js.map