export class BaseApi {
  constructor(options) {
    this._config = options;
  }

  _request(url, options) {
    return fetch(url, options).then((res) => this._checkResult(res));
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Exception: ${res.status}`);
  }
}
