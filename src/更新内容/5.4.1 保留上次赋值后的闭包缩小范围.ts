/**
 * Preserved Narrowing in Closures Following Last Assignments
 * 保留上次分配后的闭包缩小范围
 * TypeScript can usually figure out a more specific type for a variable based on checks that you might perform.
 * This process is called narrowing.
 * TypeScript 通常可以根据您可能执行的检查找出变量的更具体类型。
 * 此过程称为收窄。
 * */
function uppercaseStrings(x: string | number) {
  if (typeof x === "string") {
    // TypeScript knows 'x' is a 'string' here.
    return x.toUpperCase();
  }
}

function getUrls(url: string | URL, names: string[]) {
  if (typeof url === "string") {
    // 赋值
    url = new URL(url);
  }

  return names.map((name) => {
    // 现在可以正确判断 url 类型为 URL
    url.searchParams.set("name", name);

    return url.toString();
  });
}
/**
 * Note that narrowing analysis doesn’t kick in if the variable is assigned anywhere in a nested function.
 * This is because there’s no way to know for sure whether the function will be called later.
 * 请注意，如果变量被分配到嵌套函数中的任何位置，则缩小分析不会启动。
 * 这是因为无法确定稍后是否会调用该函数。
 * */
function printValueLater(value: string | undefined) {
  if (value === undefined) {
    value = "missing!";
  }

  setTimeout(() => {
    // Modifying 'value', even in a way that shouldn't affect
    // its type, will invalidate type refinements in closures.
    value = value;
  }, 500);

  setTimeout(() => {
    // console.log(value.toUpperCase());
    //          ~~~~~
    // error! 'value' is possibly 'undefined'.
  }, 1000);
}


export {};
