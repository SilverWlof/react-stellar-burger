import { TApiConfigPropType, TAuthPromiseResultType, TUserDataType } from "../../services/custom-types/custom-types";
import { BaseApi } from "./BaseApi";
export class AuthApi extends BaseApi {
  constructor(options: TApiConfigPropType) {
    super(options);
  }

    async _fetchWithRefresh(url: RequestInfo, options: RequestInit & { headers?: Headers} | undefined) {
        try {
            const authValue: string = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") as string : ""; 
            options?.headers?.set("Authorization", authValue);
            const res = await fetch(url, options);
            return await this._checkResult(res);
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.message === "jwt expired") {
                    const refreshData = await this._refreshToken();
                    if (!refreshData.success) {
                        return Promise.reject(refreshData);
                    }
                    localStorage.setItem("refreshToken", refreshData.refreshToken);
                    localStorage.setItem("accessToken", refreshData.accessToken);
                    //options.headers.authorization = refreshData.accessToken;
                    options?.headers?.set("Authorization", refreshData.accessToken)
                    const res = await fetch(url, options);
                    return await this._checkResult(res);
                } else {
                    return Promise.reject(err);
                }
            }
        }
  }
  ///auth/login
    login(emailStr: string, passwordStr: string) {
      return this._request(`${this.Config.baseUrl}/auth/login`, {
      method: "POST",
        headers: this.Config.headers,
      body: JSON.stringify({
        email: emailStr,
        password: passwordStr,
      }),
    });
  }

  ///auth/register
    sendRegisterUser(email: string, password: string, name: string) {
      return this._fetchWithRefresh(`${this.Config.baseUrl}/auth/register`, {
      method: "POST",
          headers: this.Config.headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
  }

  ///auth/logout
  logout() {
      return this._fetchWithRefresh(`${this.Config.baseUrl}/auth/logout`, {
      method: "POST",
          headers: this.Config.headers,
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
  }

  ///auth/token
  refreshConnection() {
      return this._fetchWithRefresh(`${this.Config.baseUrl}/auth/token`, {
      method: "POST",
        headers: this.Config.headers,
      body: JSON.stringify({
          ...this.Config.headers,
        token: localStorage.getItem("refreshToken"),
      }),
    });
  }
  _refreshToken() {
      return this._request(`${this.Config.baseUrl}/auth/token`, {
      method: "POST",
          headers: this.Config.headers,
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
  }

  ///auth/user
    getUser() {
        const newToken = (localStorage.getItem("accessToken")||'').toString()
        this.Config.headers.set("authorization", newToken)
      return this._fetchWithRefresh(`${this.Config.baseUrl}/auth/user`, {
      method: "GET",
        headers: this.Config.headers
    });
  }
    updateUser(user: TUserDataType|null) {
        const newToken = (localStorage.getItem("accessToken") || '').toString()
        this.Config.headers.set("authorization", newToken)
        const userString: string = user ? JSON.stringify(user) : "";
      return this._fetchWithRefresh(`${this.Config.baseUrl}/auth/user`, {
      method: "PATCH",
      headers: this.Config.headers,
          body: userString,
    });
  }

    ////password-reset
    sendResetPasswordMail(email: string): Promise<TAuthPromiseResultType>{
      return this._fetchWithRefresh(`${this.Config.baseUrl}/password-reset`, {
      method: "POST",
          headers: this.Config.headers,
      body: JSON.stringify({ email: email }),
    });
  }

    ////password-reset/reset
    sendChangePassword(newPassword: string, changePassToken: string){
    return this._fetchWithRefresh(
        `${this.Config.baseUrl}/password-reset/reset`,
      {
        method: "POST",
          headers: this.Config.headers,
        body: JSON.stringify({ password: newPassword, token: changePassToken }),
      },
    );
  }
}

//POST https://norma.nomoreparties.space/api/auth/login - �������� ��� �����������.
//POST https://norma.nomoreparties.space/api/auth/register - �������� ��� ����������� ������������.
//POST https://norma.nomoreparties.space/api/auth/logout - �������� ��� ������ �� �������.
//POST https://norma.nomoreparties.space/api/auth/token - �������� ���������� ������.

//GET https://norma.nomoreparties.space/api/auth/user - �������� ��������� ������ � ������������.
//PATCH https://norma.nomoreparties.space/api/auth/user - �������� ���������� ������ � ������������.

//��������� ���������� � ��������� ������ - � ��� ���� �������� � �������� ������, ����� ��� ������ �������� �� ��� �������� �������� ������ ������ �� ������� ���� endpoint:
//GET https://norma.nomoreparties.space/api/orders/{����� ������}
