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



const urlFor = <T extends {} >( params: T ,p2 : T) => {}




