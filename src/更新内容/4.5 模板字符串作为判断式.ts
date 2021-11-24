export interface Success {
  type: `${string}Success`;
  body: string;
}

export interface Error {
  type: `${string}Error`;
  message: string;
}

export function handler(r: Success | Error) {
  if (r.type === "HttpSuccess") {
    // 正确 判断

    // 'r' has type 'Success'
    let token = r.body;
  }
}
