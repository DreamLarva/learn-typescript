// Typical React et al. pattern
const Page = (p) => `Viewing ${p.postId}, ${p.commentId}, ${p.searchQuery}`;
// Identity function for Route<T, U>. The alternative is to define routes like this:
// const myRoute = [Page, ':postId/:commentId'] as Route<PageProps, ':postId/:commentId'>
const route = (r) => r;
const myRoute = route([Page, ':postId/:commentId']);
// Let's create a few functions to see how a route is passed around
// Writing Route<T> without U is possible because we gave U the default type `string`
function anyRouteFn(_) { }
anyRouteFn(myRoute);
function anotherWayFn(_) { }
anotherWayFn(myRoute);
// Don't know if this is useful for anything, but it's possible (try changing the template)
function specificRouteFn(_) { }
specificRouteFn(myRoute);
// We can define a route with an 'inline' component
const inlineRoute = route([
    // Try calling param something else
    (p) => 'Inline ' + p.param,
    '/inline-page/:param'
]);
const captureVariables = /:(\w*)/gi;
const templateToRegExp = (template) => new RegExp(template.replace(captureVariables, (_, variable) => `(?<${variable}>[^/]*)`) + '$', 'gi');
const matchesPath = (template, pathname) => templateToRegExp(template).test(pathname);
const pathToObject = (template, pathname) => { var _a, _b; return (_b = (_a = templateToRegExp(template).exec(decodeURIComponent(pathname))) === null || _a === void 0 ? void 0 : _a.groups) !== null && _b !== void 0 ? _b : {}; };
const queryStringToObject = (search) => Object.fromEntries(new URLSearchParams(search));
const urlToObject = (template, pathname, search) => ({ ...queryStringToObject(search), ...pathToObject(template, pathname) });
const objectToPath = (template, obj) => 
// Replace all variables in template with values from obj
template.replace(captureVariables, (_, variable) => encodeURIComponent(obj[variable]));
const objectToQueryString = (template, obj) => {
    var _a, _b;
    const required = 
    // Extract variables from template, these are required and used for the path
    (_b = (_a = template.match(captureVariables)) === null || _a === void 0 ? void 0 : _a.map(match => match.slice(1))) !== null && _b !== void 0 ? _b : [];
    const optional = 
    // Get all keys not in required, these are optional and supplied via query string
    Object.entries(obj).filter(([key]) => required.indexOf(key) === -1);
    return new URLSearchParams(Object.fromEntries(optional)).toString();
};
const objectToUrl = (template, obj) => {
    const pathname = objectToPath(template, obj);
    const queryString = objectToQueryString(template, obj);
    const pathPrefix = pathname[0] === '/' ? '' : '/';
    const queryStringPrefix = queryString === '' ? '' : '?';
    return new URL(location.origin + pathPrefix + pathname + queryStringPrefix + queryString);
};
const setLocation = (url) => dispatchEvent(new CustomEvent("locationChange", { detail: url }));
const navigate = (url) => {
    history.pushState(undefined, '', url.toString());
    setLocation(url);
};
// React to browser back/forward
addEventListener('popstate', () => setLocation(new URL(location.href)));
const urlFor = ([, template], params) => objectToUrl(template, params);
urlFor(myRoute, { postId: "123", commentId: "32" });
function Test() {
}
// You'd probably use JSX instead of this
const Link = ({ route, params, children }) => {
    // href 这个属性报错
    // return `<a
    //    href="${urlFor(route, params || {})}"
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
const Home = () => `<p>Welcome to my blog, check out the following pages:</p>
   <p>${Link({ route: routes.dog,
    params: { name: "Lassie", breed: "Collie" },
    children: "My dog" })}</p>
   <p>${Link({ route: routes.search,
    params: { query: "cute dogs" },
    children: "Search for 'cute dogs'" })}</p>
   <p>${Link({ route: routes.search,
    params: { query: "dog", breed: 'Collie' },
    children: "Search for 'dog' with optional parameter" })}</p>`;
const MyDog = ({ name, breed }) => `<p>My dog's name is ${name} and it's a ${breed}</p>
   <p>${Link({ route: routes.home, children: "Back to home" })}</p>`;
const Search = ({ query, breed }) => `<p>You searched for '${query}' within selected
      breed: ${breed !== null && breed !== void 0 ? breed : '[No breed selected]'}</p>
   <p>${Link({ route: routes.home, children: "Back to home" })}</p>`;
const NotFound = () => `<p>Page not found</p>
     <p>${Link({ route: routes.home, children: "Back to home" })}</p>`;
const routes = {
    home: route([Home, '/']),
    dog: route([MyDog, 'my-dog/:name/:breed']),
    search: route([Search, 'search/:query'])
};
// TypeScript is unable to infer that this function might return undefined.
// If you know why, I'd love to hear from you.
const findRoute = (pathname) => // 这里我删除了返回类型 Route<unknown> | undefined
 Object.values(routes).find(([, template]) => matchesPath(template, pathname));
const renderRoute = ({ pathname, search }) => {
    // Though findRoute explicitly returns "Route<unknown> | undefined" TypeScript
    // still says it's never undefined! Super weird.
    const matchingRoute = findRoute(pathname);
    if (!matchingRoute)
        return NotFound();
    const [component, template] = matchingRoute;
    /**
     * 这里我添加了 as any 否则报错
     * 由于 URl 现在还没有模板类型 所以 pathname 和 search 只能是string
     * 则 urlToObject 执行后的结果 现在也没法匹配 component 的参数
     * */
    return component(urlToObject(template, pathname, search)); // urlToObject 返回类型 {[key:string]:string}
};
const render = (url) => `<p><code>${url}</code></p> ${renderRoute(url)}`;
addEventListener("locationChange", ({ detail: url }) => document.body.innerHTML = render(url));
// Mock the initial url
history.replaceState(undefined, '', location.origin);
document.body.innerHTML = render(new URL(location.href));
export {};
//# sourceMappingURL=%E6%95%B4%E4%B8%80%E4%B8%AA%E6%9C%89%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5%E7%9A%84url%E8%B7%AF%E7%94%B1.js.map