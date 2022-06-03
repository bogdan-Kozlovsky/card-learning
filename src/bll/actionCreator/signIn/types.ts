import { isLoginAC, signInAC } from './actionCreator';

export type SignInActionType = ReturnType<typeof signInAC> | ReturnType<typeof isLoginAC>;
