import { Dispatch } from 'redux';

import { authApi } from '../../../dal/auth';
import {
  getStatusAC,
  initializedAC,
  setAppErrorAC,
} from '../../actionCreator/app/actionCreator';
import { authMeAC } from '../../actionCreator/auth/actionCreator';
import { isLoginAC } from '../../actionCreator/signIn/actionCreator';

export const authMeTC = () => (dispatch: Dispatch) => {
  dispatch(getStatusAC('loading'));
  authApi
    .authMeRequest()
    .then(res => {
      dispatch(initializedAC(true));
      dispatch(isLoginAC(true));
      dispatch(authMeAC(res.data));
    })
    .catch(error => {
      dispatch(isLoginAC(false));
      dispatch(initializedAC(true));
      dispatch(setAppErrorAC(error.response.data.error));
    })
    .finally(() => {
      dispatch(getStatusAC('succeeded'));
    });
};
