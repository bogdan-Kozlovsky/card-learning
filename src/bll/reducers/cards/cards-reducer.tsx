import { CardsActionType } from '../../actionCreator/cards/types';

import { CardsParamsType, CardsType, InitialStateType } from './types';

export const initialState = {
  cards: [] as CardsType[],
  cardsTotalCount: 1,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  packUserId: '5eecf82a3ed8f700042f1186',
  params: {
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 9,
    sortCards: '0updated',
    page: 1,
    pageCount: 7,
  } as CardsParamsType,
};

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionType,
) => {
  switch (action.type) {
    case 'APP/INITIALIZED_CARDS':
      return { ...state, ...action.payload };

    case 'CARDS/SET-CARDS-CURRENT-PAGE':
      return { ...state, params: { ...state.params, page: action.value } };

    default: {
      return state;
    }
  }
};
