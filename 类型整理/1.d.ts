declare type PageProps = {
    postId: string;
    commentId: string;
    searchQuery?: string;
};
declare const Page: (p: PageProps) => string;
/**
 * Turns a template into a union of all its variables.
 * Returns never if no variables are defined.
 */
declare type TemplateVariables<T extends string> = string extends T ? T : T extends "" ? ["Please provide a template. Use / if this is your index."] : T extends `${infer _Start} ${infer _Rest}` ? [`Please use dash (-) instead of whitespace in url's`] : T extends `${infer Start}/:${infer Variable}/${infer Rest}` ? TemplateVariables<Start> | Variable | TemplateVariables<Rest> : T extends `${infer Start}/:${infer Variable}` ? TemplateVariables<Start> | Variable : T extends `:${infer Variable}/${infer Rest}` ? Variable | TemplateVariables<Rest> : T extends `:${infer Variable}` ? Variable : T extends `${infer Start}:${infer Rest}` ? [`Invalid path, can't mix constants and variables: ${Start}:${Rest}`] : never;
declare type ExtractedVariables = TemplateVariables<"posts/:postId/comments/:commentId">;
declare type InvalidTemplate = TemplateVariables<":projectId/workers/prefixes_not_allowed:workerId/:docId/:x">;
declare type MoreExtractedVariables = TemplateVariables<":projectId/workers/:workerId/:docId/:x">;
declare type NoVariables = TemplateVariables<"posts">;
/**
 * Returns a union of required keys, or never if no keys are required.
 * @author Joe Calzaretta
 */
declare type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
declare type RequiredProps = RequiredKeys<PageProps>;
declare type IsValidTemplateForProps = ExtractedVariables extends RequiredProps ? true : false;
declare type IsValidTemplateForProps2 = MoreExtractedVariables extends RequiredProps ? true : false;
declare type RequiredPropsExtended = RequiredProps | 'userId';
declare type IsValidTemplateForExtendedProps = ExtractedVariables extends RequiredPropsExtended ? true : false;
/**
 * Returns true if X and Y are equal types, otherwise false
 * @author Matt McCutchen
 */
declare type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;
declare type VariablesMatchRequiredProps = Equals<ExtractedVariables, RequiredProps>;
declare type VariablesMatchRequiredPropsExtended = Equals<ExtractedVariables, RequiredPropsExtended>;
declare type NoVariablesMatchRequiredProps = Equals<NoVariables, RequiredProps>;
declare type Component<T> = (props: T) => string;
declare type Template<T, U extends string> = string extends U ? U : Equals<RequiredKeys<T>, TemplateVariables<U>> extends true ? U : [
    'Invalid route. Must contain variables for all required keys in type:',
    T,
    '(or no variables if no required keys)',
    'Whitespace is not allowed.',
    'Empty strings are not allowed (use / if this is your index)'
];
declare type Route<T, U extends string = string> = [Component<T>, Template<T, U>];
declare const route: <T, U extends string>(r: Route<T, U>) => Route<T, U>;
declare const myRoute: Route<PageProps, ":postId/:commentId">;
declare function anyRouteFn<T>(_: Route<T>): void;
declare function anotherWayFn(_: [Component<PageProps>, string]): void;
declare function specificRouteFn(_: Route<PageProps, ':postId/:commentId'>): void;
declare const inlineRoute: Route<{
    param: string;
}, "/inline-page/:param">;
declare const captureVariables: RegExp;
declare const templateToRegExp: (template: string) => RegExp;
declare const matchesPath: (template: string, pathname: string) => boolean;
declare const urlFor: <T extends {}>(params: T, p2: T) => void;
