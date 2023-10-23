export interface AuthState {
  isAuth: boolean;
}

export enum AuthActionsEnum {
  SET_AUTH = "",
}

export interface SetAuthAction {
  type: AuthActionsEnum;
  payload: boolean;
}

export type AuthAction = SetAuthAction;
