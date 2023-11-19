import { RequestInfo } from "undici-types";
import { TApiConfigPropType } from "../../services/custom-types/custom-types";

export class BaseApi {
    public Config: TApiConfigPropType;
    constructor(options: TApiConfigPropType) {
        this.Config = options;
  }

    _request(url: RequestInfo, options: RequestInit & { headers?: Headers }) {
    return fetch(url, options).then((res) => this._checkResult(res));
  }

  _checkResult(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Exception: ${res.status}`);
  }
}
