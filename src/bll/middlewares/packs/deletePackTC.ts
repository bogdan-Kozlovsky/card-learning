import { packsApi } from "../../../dal/packs";
import { ThunkType } from "../../../types/thunkType";
import { setAppErrorAC } from "../../actionCreator/app/actionCreator";

import { getPacksTC } from "./getPacksTC";

export const deletePackTC = (idPack: string): ThunkType => (dispatch) => {
  packsApi
    .deletePack(idPack)
    .then(() => {
      dispatch(getPacksTC());
    })
    .catch(error => {
      dispatch(setAppErrorAC(error.response.data.error));
    });
};