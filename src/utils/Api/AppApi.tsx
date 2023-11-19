import { TApiConfigPropType } from "../../services/custom-types/custom-types";
import { apiConfig } from "../constants";
import { AuthApi } from "./AuthApi";
class AppApi extends AuthApi {
    constructor(options:TApiConfigPropType) {
    super(options);
  }

  getIngredients() {
      return this._fetchWithRefresh(`${this.Config.baseUrl}/ingredients`, {
          headers: this.Config.headers,
    });
  }
    createOrder(orderDetails:Array<string>) {
        return this._fetchWithRefresh(`${this.Config.baseUrl}/orders`, {
      method: "POST",
            headers: this.Config.headers,
      body: JSON.stringify({ ingredients: orderDetails }),
    });
    }
    getOrderById(id: string | undefined) {
      return this._request(`${this.Config.baseUrl}/orders/${id}`, {
      method: "GET",
          headers: this.Config.headers,
    });
  }
}

export const webApi = new AppApi(apiConfig);
