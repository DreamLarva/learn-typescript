"use strict";
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
const urlFor = (params, p2) => { };
//# sourceMappingURL=1.js.map