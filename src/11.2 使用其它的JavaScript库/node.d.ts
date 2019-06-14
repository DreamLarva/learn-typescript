declare module "url" {
    export interface Url {
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }

    export function parse(urlStr: string, parseQueryString?:unknown, slashesDenoteHost?:unknown): Url
}

declare module "path"{
    export function normalize(p:string):string;
    export function join(...paths:any[]):string;
    export let _sep:string;
}
