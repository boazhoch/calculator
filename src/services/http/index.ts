import { IHttp, OPERATIONS } from "./IHttp";

class HttpRequester implements IHttp {
  private endPoint: string;

  public constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  /**
   *
   *
   * @private
   * @param {string} path
   * @returns
   * @memberof Http
   */
  private extendEndPointWithPath(path: string) {
    return `${this.endPoint}${path}`;
  }

  private constructQuery(operation: OPERATIONS, n1: number, n2: number) {
    return `/sum?op=${operation}&n1=${n1}&n2=${n2}`;
  }

  public sum(operation: OPERATIONS, n1: number, n2: number) {
    const fullPath = this.extendEndPointWithPath(
      this.constructQuery(operation, n1, n2)
    );
    return fetch(fullPath);
  }
}

export default HttpRequester;
