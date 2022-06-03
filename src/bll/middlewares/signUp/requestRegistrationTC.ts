import { Dispatch } from "redux";

import { authApi } from "../../../dal/auth";
import { setAppErrorAC } from "../../actionCreator/app/actionCreator";
import { signUpAC } from "../../actionCreator/signUp/actionCreator";

export const requestRegistrationTC =
  (data: { email: string; password: string }) => (dispatch: Dispatch) => {
    authApi
      .registrationRequest(data)
      .then(() => {
        dispatch(signUpAC(true));
      })
      .catch(error => {
        dispatch(setAppErrorAC(error.response.data.error));
      });
  };