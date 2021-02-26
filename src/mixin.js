/**
 * How Does A Mixin Work?
 * */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class Sprite {
    constructor(name) {
        this.name = "";
        this.x = 0;
        this.y = 0;
        this.name = name;
    }
}
// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:
function Scale(Base) {
    return class Scaling extends Base {
        constructor() {
            super(...arguments);
            // Mixins may not declare private/protected properties
            // however, you can use ES2020 private fields
            this._scale = 1;
        }
        setScale(scale) {
            this._scale = scale;
        }
        get scale() {
            return this._scale;
        }
    };
}
// Compose a new class from the Sprite class,
// with the Mixin Scale applier:
const EightBitSprite = Scale(Sprite);
const flappySprite = new EightBitSprite("Bird");
flappySprite.setScale(0.8);
console.log(flappySprite.scale);
/**
 * Constrained Mixins
 * 受约束的 Mixins
 * */
{
    function Jumpable(Base) {
        return class Jumpable extends Base {
            jump() {
                // This mixin will only work if it is passed a base
                // class which has setPos defined because of the
                // Positionable constraint.
                this.setPos(0, 20);
            }
        };
    }
    Jumpable(class {
        setPos(x, y) { }
    });
}
/**
 * Alternative Pattern
 * */
{
    // Each mixin is a traditional ES class
    class Jumpable {
        jump() { }
    }
    class Duckable {
        duck() { }
    }
    // Including the base
    class Sprite {
        constructor() {
            this.x = 0;
            this.y = 0;
        }
    }
    // Apply the mixins into the base class via
    // the JS at runtime
    applyMixins(Sprite, [Jumpable, Duckable]);
    let player = new Sprite();
    player.jump();
    console.log(player.x, player.y);
    // This can live anywhere in your codebase:
    function applyMixins(derivedCtor, constructors) {
        constructors.forEach((baseCtor) => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
                Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
            });
        });
    }
}
/**
 * 约束条件
 * */
/**
 * 使用 装饰器
 * 使用装饰器 混入是不能正确 将类型也混入的
 * https://github.com/microsoft/TypeScript/issues/4881
 * */
{
    // A decorator function which replicates the mixin pattern:
    const Pausable = (target) => {
        return class Pausable extends target {
            constructor() {
                super(...arguments);
                this.shouldFreeze = false;
            }
        };
    };
    let Player = class Player {
        constructor() {
            this.x = 0;
            this.y = 0;
        }
    };
    Player = __decorate([
        Pausable
    ], Player);
    // The Player class does not have the decorator's type merged:
    // 使用了修饰器的类 并没有正确并入 修饰器中的类型
    const player = new Player();
    const playerTwo = new Player();
    playerTwo.shouldFreeze;
}
/**
 * 混入静态属性
 * https://github.com/microsoft/TypeScript/issues/17829
 * More of a gotcha than a constraint.
 * 类表达式模式创建单例，因此无法在类型系统上映射它们以支持不同的变量类型.
 * You can work around this by using functions to return your classes which differ based on a generic:
 * */
{
    function base() {
        class Base {
        }
        return Base;
    }
    function derived() {
        class Derived extends base() {
        }
        return Derived;
    }
    class Spec extends derived() {
    }
    Spec.prop; // string
    Spec.anotherProp; // string
}
export {};
//# sourceMappingURL=mixin.js.map