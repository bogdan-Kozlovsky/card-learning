import { Dispatch } from 'redux';

import { authApi } from '../../../dal/auth';
import { setAppErrorAC } from '../../actionCreator/app/actionCreator';
import { isLoginAC } from '../../actionCreator/signIn/actionCreator';

export const logoutTC = () => (dispatch: Dispatch) => {
  authApi
    .logoutRequest()
    .then(() => {
      dispatch(isLoginAC(false));
    })
    .catch((error: any) => {
      dispatch(setAppErrorAC(error.response.data.error));
    });
};
