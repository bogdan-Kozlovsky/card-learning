import { packsApi } from "../../../dal/packs";
import { ThunkType } from "../../../types/thunkType";
import { getStatusAC, setAppErrorAC } from "../../actionCreator/app/actionCreator";
import { initializedPacksAC } from "../../actionCreator/packs/actionCreator";

export const getPacksTC = (): ThunkType => (dispatch, getState) => {
  dispatch(getStatusAC("loading"));
  const state = getState().packs;
  const { packName, page, max, min, userId, pageCount, sortPacks } = state.params;
  packsApi
    .getPacks(page, pageCount, userId, sortPacks, packName, min, max)
    .then(res => {
      dispatch(initializedPacksAC(res.data));
      dispatch(getStatusAC("succeeded"));
    })
    .catch(error => {
      dispatch(setAppErrorAC(error.response.data.error));
    });
};