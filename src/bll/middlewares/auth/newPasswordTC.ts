import { Dispatch } from 'redux';

import { authApi } from '../../../dal/auth';
import { getStatusAC, setAppErrorAC } from '../../actionCreator/app/actionCreator';
import { newPasswordValueAC } from '../../actionCreator/auth/actionCreator';

export const newPasswordTC =
  (data: { password: string; resetPasswordToken: string | undefined }) =>
  (dispatch: Dispatch) => {
    dispatch(getStatusAC('loading'));
    authApi
      .newPassword(data)
      .then(() => {
        dispatch(newPasswordValueAC(true));
      })
      .catch(error => {
        dispatch(setAppErrorAC(error.response.data.error));
      })
      .finally(() => {
        dispatch(getStatusAC('succeeded'));
      });
  };
