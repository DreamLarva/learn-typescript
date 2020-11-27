先搞一个测试用的组件

```ts
// Typical React et al. pattern

type PageProps = {
  postId: string;
  commentId: string;
  searchQuery?: string;
};

const Page = (p: PageProps) =>
  `Viewing ${p.postId}, ${p.commentId}, ${p.searchQuery}`;
```

基于 PageProps,两个属性是必须的;`postId`和`commentId`,searchQuery 是可选的  
属性都是字符串,组件需要将它们转换成适当的类型

给组件可以是 `https://example.com/posts/10/comments/83`  
查询部分的必须是键值对且是可选的 `https://example.com/posts/10/comments/83?searchQuery=recipe`  
先不管查询部分的内容,必须的模板的部分是`posts/:postId/comments/:commentId`

```ts
/**
 * Turns a template into a union of all its variables.
 * Returns never if no variables are defined.
 */
type TemplateVariables<T extends string> = string extends T
  ? T
  : // 匹配空字符串
  T extends ""
  ? ["Please provide a template. Use / if this is your index."]
  : // 匹配空格
  T extends `${infer _Start} ${infer _Rest}`
  ? [`Please use dash (-) instead of whitespace in url's`]
  : // ** ts 从左只有 贪婪匹配 **
  // 匹配 [const|variable]/[variable]/[const|variable]
  T extends `${infer Start}/:${infer Variable}/${infer Rest}`
  ? TemplateVariables<Start> | Variable | TemplateVariables<Rest>
  : // 匹配 [const|variable]/[variable]
  T extends `${infer Start}/:${infer Variable}`
  ? TemplateVariables<Start> | Variable
  : // 匹配 [variable]/[const|variable]
  T extends `:${infer Variable}/${infer Rest}`
  ? Variable | TemplateVariables<Rest>
  : // 匹配 [variable]
  T extends `:${infer Variable}`
  ? Variable
  : // 匹配 不是用 / 分割 常量和变量
  T extends `${infer Start}:${infer Rest}`
  ? [`Invalid path, can't mix constants and variables: ${Start}:${Rest}`]
  : // 没有任何常量被匹配到
    never;

// Hover me
type ExtractedVariables = TemplateVariables<"posts/:postId/comments/:commentId">; // postId | commentId

type InvalidTemplate = TemplateVariables<":projectId/workers/prefixes_not_allowed:workerId/:docId/:x">;
// projectId | docId | [`Invalid path, can't mix constants and variables: workerId`] | x

type MoreExtractedVariables = TemplateVariables<":projectId/workers/:workerId/:docId/:x">; // projectId | workerId | x

type NoVariables = TemplateVariables<"posts">; // never
```

https://example.com/a/B1234

| Template | Template matches B1234? |
| -------- | ----------------------- |
| a/:id    | Yes (id=B1234)          |
| a/B:id   | Yes (id=1234)           |

```ts
/**
 * 返回所有必须的属性名的类型 , 都是可选就返回never
 * @author Joe Calzaretta
 */
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K; // 原版这里没有 -?
}[keyof T];

type RequiredProps = RequiredKeys<PageProps>;
```

获取了必传的属性 和 模板中不匹配的变量. 现在就能判断两者是否匹配

```ts
type IsValidTemplateForProps = ExtractedVariables extends RequiredProps
  ? true
  : false;

type IsValidTemplateForProps2 = MoreExtractedVariables extends RequiredProps
  ? true
  : false;

// Let's add another required property to PageProps
// (we'll do it the lazy way here...)

type RequiredPropsExtended = RequiredProps | "userId";

// Is the template still valid? (Hover and see!)

type IsValidTemplateForExtendedProps = ExtractedVariables extends RequiredPropsExtended
  ? true
  : false;
```
现在的问题是 IsValidTemplateForExtendedProps 这个的结果并不正确 "userId" 这个属性并不需要
因为ts 中 A extends B 代表 A 是 B 的子类型
postId" | "commentId" 当然也是 "postId" | "commentId" | "userId" 的子类型

要修复这种情况 就必须互为子类型 , A extends B, B extends A 
```ts
/**
* X Y 是否完全相同 
* @author Matt McCutchen
*/
type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type VariablesMatchRequiredProps =
  Equals<ExtractedVariables, RequiredProps>

type VariablesMatchRequiredPropsExtended =
  Equals<ExtractedVariables, RequiredPropsExtended>

type NoVariablesMatchRequiredProps =
  Equals<NoVariables, RequiredProps>
```

```ts
type Component<T> = (props: T) => string

type Template<T, U extends string> =
  string extends U ? U : // string extends U 是必须的
  Equals<RequiredKeys<T>, TemplateVariables<U>> extends true
    ? U
    : ['Invalid route. Must contain variables for all required keys in type:', T,
       '(or no variables if no required keys)', 'Whitespace is not allowed.',
       'Empty strings are not allowed (use / if this is your index)']

type Route<T, U extends string = string> = [Component<T>, Template<T, U>]

// Identity function for Route<T, U>. The alternative is to define routes like this:
// const myRoute = [Page, ':postId/:commentId'] as Route<PageProps, ':postId/:commentId'>
const route = <T, U extends string>(r: Route<T, U>) => r

const myRoute = route([Page, ':postId/:commentId'])

// Let's create a few functions to see how a route is passed around

// Writing Route<T> without U is possible because we gave U the default type `string`
function anyRouteFn<T>(_: Route<T>) { }
anyRouteFn(myRoute)

function anotherWayFn(_: [Component<PageProps>, string]) { }
anotherWayFn(myRoute)

// Don't know if this is useful for anything, but it's possible (try changing the template)
function specificRouteFn(_: Route<PageProps, ':postId/:commentId'>) { }
specificRouteFn(myRoute)

// We can define a route with an 'inline' component
const inlineRoute = route([
  // Try calling param something else
  (p: { param: string }) => 'Inline ' + p.param,
  '/inline-page/:param'
])

```
如果移除 `string extends U ? U :` 这部分代码ts会提示潜在的错误,因为没有 extends string.

url 转 对象; 对象 转 url
```ts
const captureVariables = /:(\w*)/gi

const templateToRegExp = (template: string) =>
  new RegExp(template.replace(captureVariables,
    (_, variable) => `(?<${variable}>[^/]*)`) + '$', 'gi')

const matchesPath = (template: string, pathname: string) =>
  templateToRegExp(template).test(pathname)

const pathToObject = (template: string, pathname: string) =>
  templateToRegExp(template).exec(decodeURIComponent(pathname))?.groups ?? {}

const queryStringToObject = (search: string) =>
  Object.fromEntries(new URLSearchParams(search))

const urlToObject = (template: string, pathname: string, search: string) =>
  ({ ...queryStringToObject(search), ...pathToObject(template, pathname) })
  
const objectToPath = (template: string, obj: { [k: string]: string }) =>
  // Replace all variables in template with values from obj
  template.replace(captureVariables, (_, variable) => encodeURIComponent(obj[variable]))

const objectToQueryString = (template: string, obj: { [k: string]: string }) => {
  const required =
    // Extract variables from template, these are required and used for the path
    template.match(captureVariables)
    // slice(1) because they come out as :variableName, remove :
    ?.map(match => match.slice(1)) ?? []

  const optional =
    // Get all keys not in required, these are optional and supplied via query string
    Object.entries(obj).filter(([key]) => required.indexOf(key) === -1)

  return new URLSearchParams(Object.fromEntries(optional)).toString()
}

const objectToUrl = (template: string, obj: { [k: string]: string }) => {
  const pathname = objectToPath(template, obj)
  const queryString = objectToQueryString(template, obj)
  const pathPrefix = pathname[0] === '/' ? '' : '/'
  const queryStringPrefix = queryString === '' ? '' : '?'
  return new URL(location.origin + pathPrefix + pathname + queryStringPrefix + queryString)
}
```

集成到history 上
```ts
const setLocation = (url: URL) =>
  dispatchEvent(new CustomEvent("locationChange", { detail: url }))

// Declare the custom event
declare function addEventListener(
  type: 'locationChange',
  listener: (this: Window, ev: CustomEvent<URL>) => void,
  useCapture?: boolean): void

const navigate = (url: URL) => {
  history.pushState(undefined, '', url.toString())
  setLocation(url)
}

// React to browser back/forward
addEventListener('popstate', () => setLocation(new URL(location.href)))
```


```ts
const urlFor = <T extends {}>([, template]: Route<T>, params: T) =>
  objectToUrl(template, params)

urlFor(myRoute, { postId: "123", commentId: "32" })
// => /123/32

type LinkProps<T> = {
  route: Route<T>
  children?: any
} & (
  // Don't require params if there's no required properties on the component
  RequiredKeys<T> extends never
    ? { params?: T }
    : { params: T }
)

// You'd probably use JSX instead of this
const Link = <T>({ route, params, children } : LinkProps<T>) =>
  `<a
     href="${urlFor(route, params || {})}"
     onclick="navigate(this); event.preventDefault()"
   >${children}</a>`

Link({
  route: myRoute,
  params: { postId: "123", commentId: "1", searchQuery: "recipe" },
  children: 'Go to myRoute'
})
// => <a href="/123/1?searchQuery=recipe" onclick="...">Go to myRoute</a>
```

完整demo
```ts
// Explicitly returning string is required for the demo, but not when using JSX
const Home = (): string =>
  `<p>Welcome to my blog, check out the following pages:</p>
   <p>${Link({ route: routes.dog,
               params: { name: "Lassie", breed: "Collie" },
               children: "My dog" })}</p>
   <p>${Link({ route: routes.search,
               params: { query: "cute dogs" },
               children: "Search for 'cute dogs'" })}</p>
   <p>${Link({ route: routes.search,
               params: { query: "dog", breed: 'Collie' },
               children: "Search for 'dog' with optional parameter" })}</p>`

type MyDogProps = {
  name: string
  breed: string
}

const MyDog = ({ name, breed }: MyDogProps): string =>
  `<p>My dog's name is ${name} and it's a ${breed}</p>
   <p>${Link({ route: routes.home, children: "Back to home" })}</p>`

type SearchProps = {
  query: string
  breed?: string
}

const Search = ({ query, breed}: SearchProps): string =>
  `<p>You searched for '${query}' within selected
      breed: ${breed ?? '[No breed selected]'}</p>
   <p>${Link({ route: routes.home, children: "Back to home" })}</p>`

const NotFound = (): string =>
    `<p>Page not found</p>
     <p>${Link({ route: routes.home, children: "Back to home" })}</p>`

const routes = {
  home:   route([Home,   '/']),
  dog:    route([MyDog,  'my-dog/:name/:breed']),
  search: route([Search, 'search/:query'])
}

// TypeScript is unable to infer that this function might return undefined.
// If you know why, I'd love to hear from you.
const findRoute = (pathname: string): Route<unknown> | undefined =>
  Object.values(routes).find(([, template]) => matchesPath(template, pathname))

const renderRoute = ({ pathname, search }: URL) => {
  // Though findRoute explicitly returns "Route<unknown> | undefined" TypeScript
  // still says it's never undefined! Super weird.
  const matchingRoute = findRoute(pathname)
  if (!matchingRoute)
    return NotFound()
  const [component, template] = matchingRoute
  return component(urlToObject(template, pathname, search))
}

const render = (url: URL) =>
  `<p><code>${url}</code></p> ${renderRoute(url)}`

addEventListener("locationChange", ({ detail: url }) =>
  document.body.innerHTML = render(url))

// Mock the initial url
history.replaceState(undefined, '', location.origin)

document.body.innerHTML = render(new URL(location.href))
```
