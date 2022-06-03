import { cardsApi } from "../../../dal/cards";
import { ThunkType } from "../../../types/thunkType";
import { setAppErrorAC } from "../../actionCreator/app/actionCreator";

import { getCardsTC } from "./getCardsTC";

export const updateCardTC = (packId: string | undefined, _id: string, updateName: string): ThunkType => dispatch => {
  const card = {
    _id,
    question: updateName,
  };
  cardsApi
    .updateCard(card)
    .then(() => {
      dispatch(getCardsTC(packId));
    })
    .catch(error => {
      dispatch(setAppErrorAC(error.response.data.error));
    });
};