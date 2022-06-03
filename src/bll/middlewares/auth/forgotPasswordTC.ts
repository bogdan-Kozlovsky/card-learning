import { Dispatch } from "redux";

import { authApi } from "../../../dal/auth";
import { ForgotPasswordType } from "../../../dal/types";
import { getStatusAC, setAppErrorAC } from "../../actionCreator/app/actionCreator";
import { forgotValueAC } from "../../actionCreator/auth/actionCreator";

export const forgotPasswordTC = (data: ForgotPasswordType) => (dispatch: Dispatch) => {
  dispatch(getStatusAC('loading'));
  authApi
    .forgotPassword(data)
    .then(() => {
      dispatch(forgotValueAC(true));
    })
    .catch(error => {
      dispatch(setAppErrorAC(error.response.data.error));
    })
    .finally(() => {
      dispatch(getStatusAC('succeeded'));
    });
};