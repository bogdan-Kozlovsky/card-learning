import { AppRootStateType } from '../../store';

export const selectSignUpIsRegistration = (state: AppRootStateType): boolean =>
  state.signUp.isRegistration;