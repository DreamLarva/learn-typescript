import * as CSS from "csstype";

/*
interface StylesObject<P extends object = {}> extends Styles {
  //        ^~~~~~~~~~~^  error
  foo: (props: P) => void;
}

type Styles<P extends object = {}> = {
  foo: (props: P) => void;
};
*/

/*
报错
'{}' is assignable to the constraint of type 'P' (a), but 'P' could be instantiated
with a different subtype of constraint 'object' (b).

问题
1. StylesObject 兼容 Styles ,或者说 是 Styles 的子类型
2. 当写了 extends Styles, 我们没有设置 Styles 的泛型, 所以 P 初始化为 默认的 {} 类型
3. StylesObject<P> 希望 继承 Styles<{}>, 但是这两者 不兼容
* */

/*
{
  const myStylesObject: StylesObject<{ foo: string }> = {foo(){}};
  const styles: Styles<{}> = myStylesObject; // error: incompatible
}
*/

/*
In principle, StylesObject allows any argument type,
 that extends constraint object (default = {} not important here).
 And Styles<{}> would be compatible to object. This is what error part (a) says.

But what, if P is a more narrow subtype of object,
like myStylesObject in above code?
 It wouldn't work anymore. This is what error part (b) says.

 子类型  和 父类型 同时有泛型时
 我觉得 意思就是 出现 父子类型 泛型 协变
* */

/**
 * 解决办法 1
 * 使用 交叉类型 拓展
 * */
{
  type StylesFn<P extends object> = (
    props: P
  ) => CSS.Properties<JssValue<P>> | number | string;

  type JssValue<P extends object> =
    | string
    | number
    | Array<string | number>
    | StylesFn<P>;

  type StylesObject<K extends string = any, P extends object = {}> = Styles<K, P> & {
    [x: string]: CSS.Properties<JssValue<P>> | Styles<K, P>;
  }
  type Styles<K extends string = any, P extends object = {}> = {
    [x in K]: CSS.Properties<JssValue<P>> | StylesObject<any, P> | StylesFn<P>
  };

}

/**
 * 办法 2
 *
 * 但是这个例子写的有问题
 * */
/*{
  type StylesFn<P extends object> = (
    props: P
  ) => CSS.Properties<JssValue<P>> | number | string;

  type JssValue<P extends object> =
    | string
    | number
    | Array<string | number>
    | StylesFn<P>;

  interface StylesObject<K extends string = any, P extends object = {}>
    extends Styles<K, P> {
    [x: string]: CSS.Properties<JssValue<P>> | Styles<K, P>;
  }
  type Styles<K extends string = any, P extends object = {}> = {
    [x in K]: CSS.Properties<JssValue<P>> | StylesObject<any, P> | StylesFn<P>
  };

}*/

export {};
