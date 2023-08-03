export class Api {
  constructor(options) {
      this._config = options;
  }


  _request(url, options) {
      return fetch(url, options).then(this._checkResult);
  }

  _checkResult(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Îøèáêà: ${res.status}`);
  }

  getIngridients() {
      return this._request(`${this._config.baseUrl}/ingredients`, { headers: this._config.headers });
  }
  createOrder(orderDetails) {
      return this._request(`${this._config.baseUrl}/ingredients`, { headers: this._config.headers });
  }
}