// Typical React et al. pattern

type PageProps = {
  postId: string;
  commentId: string;
  searchQuery?: string;
};

const Page = (p: PageProps) =>
  `Viewing ${p.postId}, ${p.commentId}, ${p.searchQuery}`;

/**
 * Turns a template into a union of all its variables.
 * Returns never if no variables are defined.
 */
type TemplateVariables<T extends string> = string extends T
  ? T
  : // Match empty strings
  T extends ""
  ? ["Please provide a template. Use / if this is your index."]
  : // Match whitespace
  T extends `${infer _Start} ${infer _Rest}`
  ? [`Please use dash (-) instead of whitespace in url's`]
  : // Match [const|variable]/[variable]/[const|variable]
  T extends `${infer Start}/:${infer Variable}/${infer Rest}`
  ? TemplateVariables<Start> | Variable | TemplateVariables<Rest>
  : // Match [const|variable]/[variable]
  T extends `${infer Start}/:${infer Variable}`
  ? TemplateVariables<Start> | Variable
  : // Match [variable]/[const|variable]
  T extends `:${infer Variable}/${infer Rest}`
  ? Variable | TemplateVariables<Rest>
  : // Match [variable]
  T extends `:${infer Variable}`
  ? Variable
  : // Match constants and variables not separated by /
  T extends `${infer Start}:${infer Rest}`
  ? [`Invalid path, can't mix constants and variables: ${Start}:${Rest}`]
  : // No variables found
    never;

// Hover me
type ExtractedVariables = TemplateVariables<"posts/:postId/comments/:commentId">;

type InvalidTemplate = TemplateVariables<":projectId/workers/prefixes_not_allowed:workerId/:docId/:x">;

type MoreExtractedVariables = TemplateVariables<":projectId/workers/:workerId/:docId/:x">;

type NoVariables = TemplateVariables<"posts">;

/**
 * Returns a union of required keys, or never if no keys are required.
 * @author Joe Calzaretta
 */
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

type RequiredProps = RequiredKeys<PageProps>



type IsValidTemplateForProps =
  ExtractedVariables extends RequiredProps ? true : false

type IsValidTemplateForProps2 =
  MoreExtractedVariables extends RequiredProps ? true : false

// Let's add another required property to PageProps
// (we'll do it the lazy way here...)

type RequiredPropsExtended = RequiredProps | 'userId'

// Is the template still valid? (Hover and see!)

type IsValidTemplateForExtendedProps =
  ExtractedVariables extends RequiredPropsExtended ? true : false


/**
 * Returns true if X and Y are equal types, otherwise false
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




type Component<T> = (props: T) => string

type Template<T, U extends string> =
  string extends U ? U :
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
  template.replace(captureVariables, (_, variable) => encodeURIComponent(obj[variable]!))

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

const setLocation = (url: URL) =>
  dispatchEvent(new CustomEvent("locationChange", { detail: url }))

// Declare the custom event
declare function addEventListener(
  type: 'locationChange'| 'popstate',
  listener: (this: Window, ev: CustomEvent<URL>) => void,
  useCapture?: boolean): void

const navigate = (url: URL) => {
  history.pushState(undefined, '', url.toString())
  setLocation(url)
}

// React to browser back/forward
addEventListener('popstate', () => setLocation(new URL(location.href)))



const urlFor = <T extends {}>([, template]: Route<T>, params:T) =>
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

function Test(){

}

// You'd probably use JSX instead of this
const Link = <T>({ route, params, children }: LinkProps<T>) => {
  // href 这个属性报错
  // return `<a
  //    href="${urlFor(route, params || {} as)}"
  //    onclick="navigate(this); event.preventDefault()"
  //  >${children}</a>`;
};

Link({
  route: myRoute,
  params: { postId: "123", commentId: "1", searchQuery: "recipe" },
  children: "Go to myRoute",
});
// => <a href="/123/1?searchQuery=recipe" onclick="...">Go to myRoute</a>

// error
// Link({
//   route: myRoute,
//   params: { postId1: "123", commentId: "1", searchQuery: "recipe" },
//   children: 'Go to myRoute'
// })



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
const findRoute = (pathname: string) => // 这里我删除了返回类型 Route<unknown> | undefined
  Object.values(routes).find(([, template]) => matchesPath(template, pathname))

const renderRoute = ({ pathname, search }: URL) => {
  // Though findRoute explicitly returns "Route<unknown> | undefined" TypeScript
  // still says it's never undefined! Super weird.
  const matchingRoute = findRoute(pathname)
  if (!matchingRoute)
    return NotFound()
  const [component, template] = matchingRoute
  /**
   * 这里我添加了 as any 否则报错
   * 由于 URl 现在还没有模板类型 所以 pathname 和 search 只能是string
   * 则 urlToObject 执行后的结果 现在也没法匹配 component 的参数
   * */
  return component(urlToObject(template, pathname, search) as any) // urlToObject 返回类型 {[key:string]:string}
}

const render = (url: URL) =>
  `<p><code>${url}</code></p> ${renderRoute(url)}`

addEventListener("locationChange", ({ detail: url }) =>
  document.body.innerHTML = render(url))

// Mock the initial url
history.replaceState(undefined, '', location.origin)

document.body.innerHTML = render(new URL(location.href))


export {}
