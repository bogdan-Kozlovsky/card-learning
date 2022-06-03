import { CardsType, UpdatedGradeType } from '../../reducers/cards/types';

export const initializedCardsAC = (cards: CardsType[]) =>
  ({ type: 'APP/INITIALIZED_CARDS', payload: cards } as const);

export const setCardsCurrentPageAC = (value: number) =>
  ({ type: 'CARDS/SET-CARDS-CURRENT-PAGE', value } as const);

export const setGradeCardAC = (value: UpdatedGradeType) =>
  ({ type: 'CARDS/SET-GRADE-CARD', value } as const);
