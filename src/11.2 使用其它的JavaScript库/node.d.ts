declare module "url" {
  export interface Url {
    //  All declarations of protocol must have identical modifiers.
    // pathname?: string; // error

    protocol: string;
    hostname: string|undefined;

  }

  export function parse(
    urlStr: string,
    parseQueryString?: unknown,
    slashesDenoteHost?: unknown
  ): Url;
}

declare module "path" {
  export function normalize(p: string): string;

  export function join(...paths: any[]): string;

  export let _sep: string;
}
