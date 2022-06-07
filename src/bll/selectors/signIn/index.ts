import { AppRootStateType } from '../../store';

export const selectSignInisLogin = (state: AppRootStateType): boolean =>
  state.signIn.isLogin;