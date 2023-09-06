import { apiConfig } from "./constants";
class Api {
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

  getIngredients() {
    return this._request(`${this._config.baseUrl}/ingredients`, {
      headers: this._config.headers,
    });
  }
  createOrder(orderDetails) {
    return this._request(`${this._config.baseUrl}/orders`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify({ ingredients: orderDetails }),
    });
  }
}

export const webApi = new Api(apiConfig)