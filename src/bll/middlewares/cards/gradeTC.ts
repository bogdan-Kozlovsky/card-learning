import { cardsApi } from '../../../dal/cards';
import { ThunkType } from '../../../types/thunkType';
import { setGradeCardAC } from '../../actionCreator/cards/actionCreator';

export const gradeTC =
  (grade: number, card_id: string): ThunkType =>
  dispatch => {
    const payload = {
      grade,
      card_id,
    };
    cardsApi.gradeCard(payload).then(res => {
      dispatch(setGradeCardAC(res.data));
    });
  };
