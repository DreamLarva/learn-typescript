/**
 * TypeScript 1.8 为类和接口方法扩展了用户定义的类型收窄函数.
 * this is T 现在是类或接口方法的合法的返回值类型标注. 当在类型收窄的位置使用时 (比如 if 语句), 函数调用表达式的目标对象的类型会被收窄为 T.
 * */
class FileSystemObject {
  constructor(public path: string, private networked: boolean) {}

  isFile(): this is File {
    return this instanceof File;
  } // 收窄为 File 类型

  isDirectory(): this is Directory {
    return this instanceof Directory;
  } // 收窄为 Directory 类型

  isNetworked(): this is Networked & this {
    return this.networked;
  } // 注意此处和上面不同 断言当前 实例 为 Networked & this 类型`
}

class File extends FileSystemObject {
  constructor(path: string, public content: string) {
    super(path, false);
  }
}

class Directory extends FileSystemObject {
  children!: FileSystemObject[];
}

interface Networked {
  host: string;
}

let fso: FileSystemObject = new File("foo/bar.txt", "foo");
if (fso.isFile()) {
  fso.content; // fso 是 File
} else if (fso.isDirectory()) {
  fso.children; // fso 是 Directory
} else if (fso.isNetworked()) {
  fso.host; // fso 是 networked
}

interface Interface {
  a?: { b: number };
}

export {};
