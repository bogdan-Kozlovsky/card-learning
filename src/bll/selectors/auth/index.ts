import { AppRootStateType } from '../../store';

export const selectAuthNewPasswordValue = (state: AppRootStateType): boolean =>
  state.auth.newPasswordValue;

export const selectAuthForgotValue = (state: AppRootStateType): boolean =>
  state.auth.forgotValue;

export const selectAuthForgotProfileName = (state: AppRootStateType): string =>
  state.auth.profile.name;

export const selectAuthForgotProfileAvatar = (state: AppRootStateType): string =>
  state.auth.profile.avatar;

export const selectAuthForgotProfileEmail = (state: AppRootStateType): string | null =>
  state.auth.profile.email;
