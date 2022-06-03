import { instance } from '../config';
import {
  AddedUserType,
  ForgotPasswordType,
  ProfileType,
  RegistrationType,
} from '../types';

export const authApi = {
  registrationRequest(data: RegistrationType) {
    return instance.post<AddedUserType>('auth/register', data);
  },

  loginRequest(data: { email: string; password: string; rememberMe: boolean }) {
    return instance.post<ProfileType>('auth/login', data);
  },

  authMeRequest() {
    return instance.post<ProfileType>('auth/me', {});
  },

  logoutRequest() {
    return instance.delete('/auth/me', {});
  },

  forgotPassword(data: ForgotPasswordType) {
    return instance.post<ProfileType>('auth/forgot', data);
  },

  newPassword(data: { password: string; resetPasswordToken: string | undefined }) {
    return instance.post<{ info: string; error: string }>('auth/set-new-password', data);
  },
};
