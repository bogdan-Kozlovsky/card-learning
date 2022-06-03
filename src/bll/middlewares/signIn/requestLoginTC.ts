import { Dispatch } from 'redux';

import { authApi } from '../../../dal/auth';
import { setAppErrorAC } from '../../actionCreator/app/actionCreator';
import { authMeAC } from '../../actionCreator/auth/actionCreator';
import { isLoginAC, signInAC } from '../../actionCreator/signIn/actionCreator';

export const requestLoginTC =
  (data: { email: string; password: string; rememberMe: boolean }) =>
  (dispatch: Dispatch) => {
    authApi
      .loginRequest(data)
      .then(res => {
        dispatch(isLoginAC(true));
        dispatch(signInAC(res.data));
        dispatch(authMeAC(res.data));
      })
      .catch(error => {
        dispatch(setAppErrorAC(error.response.data.error));
      });
  };
