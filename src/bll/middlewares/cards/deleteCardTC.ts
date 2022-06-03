import { cardsApi } from '../../../dal/cards';
import { ThunkType } from '../../../types/thunkType';
import { setAppErrorAC } from '../../actionCreator/app/actionCreator';

import { getCardsTC } from './getCardsTC';

export const deleteCardTC =
  (packId: string | undefined, cardId: string | undefined): ThunkType =>
  dispatch => {
    cardsApi
      .deleteCard(cardId)
      .then(() => {
        dispatch(getCardsTC(packId));
      })
      .catch(error => {
        dispatch(setAppErrorAC(error.response.data.error));
      });
  };
