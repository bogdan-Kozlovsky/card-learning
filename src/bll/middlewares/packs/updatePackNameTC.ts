import { packsApi } from "../../../dal/packs";
import { ThunkType } from "../../../types/thunkType";
import { setAppErrorAC } from "../../actionCreator/app/actionCreator";

import { getPacksTC } from "./getPacksTC";

export const updatePackNameTC = (idPack: string, name: string | null): ThunkType => (dispatch, getState) => {
  const newPackName = {
    _id: idPack,
    name
  };
  packsApi
    .updatePackNameTC(newPackName)
    .then(() => {
      dispatch(getPacksTC());
    })
    .catch(error => {
      dispatch(setAppErrorAC(error.response.data.error));
    });
};