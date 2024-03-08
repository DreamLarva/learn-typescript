function a<T extends {id: string}>() {
  let x: `-${keyof T & string}`;

  // Used to error, now doesn't.
  x = "-id";

  // x = "id" // error
}

export  {}
