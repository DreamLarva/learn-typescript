interface Box<T> {
  value: T;
}

function makeBox<T>(value: T) {
  return { value };
}

interface Hammer {}
interface Wrench {}

// 直接定下 泛型 T
const makeHammerBox = makeBox<Hammer>;
const makeWrenchBox = makeBox<Wrench>;
const makeStringBox = makeBox<string>;

// TypeScript correctly rejects this.
// makeStringBox(42);
