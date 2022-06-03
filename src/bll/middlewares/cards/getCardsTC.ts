import { cardsApi } from '../../../dal/cards';
import { ThunkType } from '../../../types/thunkType';
import { getStatusAC, setAppErrorAC } from '../../actionCreator/app/actionCreator';
import { initializedCardsAC } from '../../actionCreator/cards/actionCreator';

export const getCardsTC =
  (packId: string | undefined): ThunkType =>
  (dispatch, getState) => {
    dispatch(getStatusAC('loading'));
    const { page, pageCount } = getState().cards.params;
    cardsApi
      .getCards(packId, pageCount, page)
      .then(res => {
        dispatch(initializedCardsAC(res.data));
      })
      .catch(error => {
        dispatch(setAppErrorAC(error.response.data.error));
      })
      .finally(() => {
        dispatch(getStatusAC('succeeded'));
      });
  };
