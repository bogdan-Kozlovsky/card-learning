import { ProfileType } from '../../../dal/types';

export const signInAC = (data: ProfileType) => ({ type: 'LOGIN/SIGN_IN', data } as const);

export const isLoginAC = (value: boolean) =>
  ({ type: 'LOGIN/IS-LOGIN', payload: { value } } as const);
