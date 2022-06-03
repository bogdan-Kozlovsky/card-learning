import { packsApi } from '../../../dal/packs';
import { ThunkType } from '../../../types/thunkType';
import { setAppErrorAC } from '../../actionCreator/app/actionCreator';

import { getPacksTC } from './getPacksTC';

export const addPacksTC =
  (name: string): ThunkType =>
  dispatch => {
    packsApi
      .addNewPack(name)
      .then(() => {
        dispatch(getPacksTC());
      })
      .catch(error => {
        dispatch(setAppErrorAC(error.response.data.error));
      });
  };
