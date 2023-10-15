import { BaseApi } from "./BaseApi";
export class AuthApi extends BaseApi {
  constructor(options) {
    super(options);
  }

  async _fetchWithRefresh(url, options) {
      try {
          options.headers.authorization = localStorage.getItem("accessToken");
      const res = await fetch(url, options);
      return await this._checkResult(res);
      } catch (err) {
          console.log('_fetchWithRefresh err')
          console.log(err)
      if (err.message === "jwt expired") {
        const refreshData = await this._refreshToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
          options.headers.authorization = refreshData.accessToken;
          const res = await fetch(url, options);
        return await this._checkResult(res);
      } else {
        return Promise.reject(err);
      }
    }
  }
  ///auth/login
  login(emailStr, passwordStr) {
    return this._request(`${this._config.baseUrl}/auth/login`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify({
        email: emailStr,
        password: passwordStr,
      }),
    });
  }

  ///auth/register
  sendRegisterUser(email, password, name) {
    return this._fetchWithRefresh(`${this._config.baseUrl}/auth/register`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
  }

  ///auth/logout
  logout() {
    return this._fetchWithRefresh(`${this._config.baseUrl}/auth/logout`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
  }

  ///auth/token
  refreshConnection() {
    return this._fetchWithRefresh(`${this._config.baseUrl}/auth/token`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify({
        ...this._config.headers,
        token: localStorage.getItem("refreshToken"),
      }),
    });
  }
  _refreshToken() {
    return this._request(`${this._config.baseUrl}/auth/token`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
  }

  ///auth/user
  getUser() {
    return this._fetchWithRefresh(`${this._config.baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        ...this._config.headers,
        authorization: localStorage.getItem("accessToken"),
      },
    });
  }
  updateUser(user) {
    return this._fetchWithRefresh(`${this._config.baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        ...this._config.headers,
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(user),
    });
  }

  ////password-reset
  sendResetPasswordMail(email) {
    return this._fetchWithRefresh(`${this._config.baseUrl}/password-reset`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify({ email: email }),
    });
  }

  ////password-reset/reset
  sendChangePassword(newPassword, changePassToken) {
    return this._fetchWithRefresh(
      `${this._config.baseUrl}/password-reset/reset`,
      {
        method: "POST",
        headers: this._config.headers,
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
