export interface IHttp {
  sum(operation: OPERATIONS, n1: number, n2: number): Promise<Response>;
}

export interface IHttpConstructor {
  new (path: string): IHttp;
}

export enum OPERATIONS {
  "+" = "plus",
  "-" = "minus",
  "x" = "multi",
  "/" = "div"
}
