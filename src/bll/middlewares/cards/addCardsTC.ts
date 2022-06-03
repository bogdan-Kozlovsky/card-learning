import { cardsApi } from '../../../dal/cards';
import { ThunkType } from '../../../types/thunkType';
import { setAppErrorAC } from '../../actionCreator/app/actionCreator';

import { getCardsTC } from './getCardsTC';

export const addCardsTC =
  (packId: string | undefined, title: string): ThunkType =>
  dispatch => {
    cardsApi
      .addNewCards(packId, title)
      .then(() => {
        dispatch(getCardsTC(packId));
      })
      .catch(error => {
        dispatch(setAppErrorAC(error.response.data.error));
      });
  };
