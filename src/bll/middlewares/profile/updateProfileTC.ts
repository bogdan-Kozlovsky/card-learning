import { Dispatch } from "redux";

import { profileApi } from "../../../dal/profile";
import { setAppErrorAC } from "../../actionCreator/app/actionCreator";
import { updateProfileAC, updateProfileNameAC } from "../../actionCreator/profile/actionCreator";

export const updateProfileTC = (name: string, avatar: any) => (dispatch: Dispatch) => {
  profileApi
    .updateProfile(name, avatar)
    .then(res => {
      dispatch(updateProfileAC(res.data.updatedUser));
      dispatch(updateProfileNameAC(name));
    })
    .catch(error => {
      dispatch(setAppErrorAC(error.response.data.error));
    });
};