import { webApi } from "../../utils/Api/AppApi";
import { AppDispatch, AppThunk } from "../storage/index";
import { TAuthPromiseResultType, TUserDataType } from "../custom-types/custom-types";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";


export type TAuthActions = ISetAuthCheckedAction | ISetUserAction;


export interface ISetAuthCheckedAction {
    readonly type: typeof SET_AUTH_CHECKED;
    payload: boolean;
}
export const setAuthChecked = (value: boolean): ISetAuthCheckedAction => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});


export interface ISetUserAction {
    readonly type: typeof SET_USER;
    payload: TUserDataType|null;
}
export const setUser = (user: TUserDataType|null): ISetUserAction => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
    return (dispatch: AppDispatch) => {
    return webApi.getUser().then((res) => {
      dispatch(setUser(res.user));
    })
        .catch((e) => {
            console.error("Failed to get user.");
            console.error(e);
        });
  };
};

export const login = (email: string, password: string) => {
    return (dispatch: AppDispatch) => {
    return webApi.login(email, password).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      const user = { ...res.user, password: password };
      dispatch(setUser(user));
      dispatch(setAuthChecked(true));
    })
        .catch((e) => {
            dispatch(setAuthChecked(true));
            console.error("Failed to login.");
            console.error(e);
        });
  };
};

export const checkUserAuth: AppThunk = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch((e: unknown) => {
                    if (e instanceof Error) {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        dispatch(setUser(null));
                    }

                })
                .catch((e: unknown) => {

                    if (e instanceof Error) {
                        console.error("Failed to check auth.");
                        console.error(e);
                    }
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};

export const logout = () => {
    return (dispatch:AppDispatch) => {
    return webApi.logout().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    })
        .catch((e) => {
            console.error("Failed to logout.");
            console.error(e);
        });
  };
};

export const registerUser = (email: string, password: string, name: string) => {
    return (dispatch: AppDispatch) => {
    return webApi.sendRegisterUser(email, password, name).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    })
        .catch((e) => {
            console.error("Failed to register user.");
            console.error(e);
        });
  };
};

export const updateUser = (user: TUserDataType | null) => {
    return (dispatch: AppDispatch) => {
    return webApi.updateUser(user).then((res) => {
      dispatch(setUser(res.user));
    })
        .catch((e) => {
            console.error("Failed to update user.");
            console.error(e);
        });
  };
};

export const sendResetPasswordMail = (email: string) => {

    return webApi.sendResetPasswordMail(email)
        .catch<TAuthPromiseResultType>((e) => {
            console.error("Failed to send reset password mail.");
            console.error(e);
            return { success: false, message: e }
        });
};

export const sendChangePassword = (newPassword: string, tokenFromMail: string) => {
    return (dispatch: AppDispatch) => {
      return webApi.sendChangePassword(newPassword, tokenFromMail)
          .catch((e) => {
              console.error("Failed to send change password.");
              console.error(e);
          });
  };
};
