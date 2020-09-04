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
enum AnimalFlags {
  None = 0,
  HasClaws = 1 << 0,
  CanFly = 1 << 1,
  EatsFish = 1 << 2,
  Endangered = 1 << 3,

  EndangeredFlyingClawedFishEating = HasClaws | CanFly | EatsFish | Endangered,
}

/**
 * 在这里，我们使用了左移的位运算符，将数字 1 的二进制向左移动位置得到数字 0001、0010、0100 和 1000（换成十进制结果是：1, 2, 4, 8）。
 * 供32位 供使用
 * 当你在使用这种标记的时候，这些位运算符 | (位与)、& （位与）、~ （位非）将会是你最好的朋友：
 * */
interface Animal {
  flags: AnimalFlags;

  [key: string]: any;
}

function printAnimalAbilities(animal: Animal) {
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

/**
 * 我们使用 |= 来添加一个标志；
 * 组合使用 &= 和 ~ 来清理一个标志；
 * | 来合并标志。
 * */

export {};
