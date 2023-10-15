import { apiConfig } from "../constants";
import { AuthApi } from "./AuthApi";
class AppApi extends AuthApi {
  constructor(options) {
    super(options);
  }

  getIngredients() {
    return this._fetchWithRefresh(`${this._config.baseUrl}/ingredients`, {
      headers: this._config.headers,
    });
  }
    createOrder(orderDetails) {
        console.log('createOrder')
      return this._fetchWithRefresh(`${this._config.baseUrl}/orders`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify({ ingredients: orderDetails }),
    });
  }
  getOrderById(id) {
    return this._request(`${this._config.baseUrl}/orders/${id}`, {
      method: "GET",
      headers: this._config.headers,
    });
  }
}

export const webApi = new AppApi(apiConfig);
