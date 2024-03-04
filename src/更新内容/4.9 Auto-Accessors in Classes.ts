/**
 * accessor 语法糖
 * 在 TypeScript 4.9 版本中，`accessor` 关键字被用来支持 ECMAScript 中的一项即将推出的功能，
 * 即自动访问器¹。自动访问器就像类上的属性一样声明，只不过它们是用 `accessor` 关键字声明的。
 * 这个关键字不同于 `public`、`private` 和 `protected` 这些访问修饰符 ，
 * 它们用来控制类成员从外部访问的权限³。
 * */
/*
自动访问器是一种特殊的类成员，它提供了一种灵活的机制来读取、写入或计算私有字段的值¹。它们可以用作公共数据成员，但是它们是通过特殊的方法，称为“访问器”，来实现的¹。这种功能使得可以轻松地访问数据，同时也有助于提高方法的安全性和灵活性¹。

在某些情况下，属性的 `get` 和 `set` 访问器只是向支持字段赋值或从其中检索值，而不包含任何附加逻辑。在这种情况下，可以使用自动实现的属性来简化代码¹。自动实现的属性通过以下方式定义：使用 `get` 和 `set` 关键字，但不提供任何实现¹。

例如，在 C# 中，你可以这样定义一个自动实现的属性：

```csharp
public class SaleItem
{
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

在这个例子中，`Name` 和 `Price` 都是自动实现的属性。它们具有 `get` 和 `set` 访问器，但没有提供任何实现¹。这意味着你可以像操作普通字段一样操作这些属性，而无需编写额外的代码来管理它们的读取和写入操作。

希望这个解释对你有所帮助！

源: 与必应的对话， 2023/9/4
(1) 属性 - C# 编程指南 | Microsoft Learn. https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/properties.
(2) 厉害了！推荐一个 Web 端自动化神器 - Automa - 知乎. https://zhuanlan.zhihu.com/p/431251646.
(3) 步骤 2：配置远程访问服务器 | Microsoft Learn. https://learn.microsoft.com/zh-cn/windows-server/remote/remote-access/ras/manage-remote-clients/install/step-2-configure-the-remote-access-server.
* */

class Person {
  accessor name: string;

  constructor(name: string) {
    this.name = name;
  }
}


/* 编译后
class Person {
    #__name: string;
    get name() {
        return this.#__name;
    }
    set name(value: string) {
        this.#__name = value;
    }
    constructor(name: string) {
        this.name = name;
    }
}
* */

class Person2 {
  accessor name: string;

  constructor(name: string) {
    this.name = name;
  }
}
