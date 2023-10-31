import axios from "axios";
import { AppDispatch } from "../..";
import { IUser } from "../../../models/IUser";
import {
  AuthActionsEnum,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from "./types";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionsEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (isAuth: boolean): SetAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload: isAuth,
  }),
  setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionsEnum.SET_IS_LOADING,
    payload: isLoading,
  }),
  setError: (error: string): SetErrorAction => ({
    type: AuthActionsEnum.SET_ERROR,
    payload: error,
  }),
  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          const response = await axios.get<IUser[]>("./users.json");
          const mockUser = response.data.find(
            (x) => x.username === username && x.password === password
          );
          if (mockUser) {
            localStorage.setItem("auth", "true");
            localStorage.setItem("username", mockUser.username);
            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AuthActionCreators.setUser(mockUser));
            dispatch(AuthActionCreators.setIsLoading(false));
          } else {
            dispatch(AuthActionCreators.setError("Пользователь не найден"));
          }
        }, 1000);
      } catch (e) {
        dispatch(AuthActionCreators.setError("Произошла ошибка при логине"));
      }
    },
  logout: () => async (dispatch: AppDispatch) => {
    try {
    } catch (e) {}
  },
};
