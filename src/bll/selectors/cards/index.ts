import { CardsParamsType, CardsType } from '../../reducers/cards/types';
import { AppRootStateType } from '../../store';

export const selectCardsCards = (state: AppRootStateType): CardsType[] =>
  state.cards.cards;

export const selectCardsPackUserId = (state: AppRootStateType): string =>
  state.cards.packUserId;

export const selectCardsCardsTotalCount = (state: AppRootStateType): number =>
  state.cards.cardsTotalCount;

export const selectCardsCardsParamsPageCount = (
  state: AppRootStateType,
): CardsParamsType => state.cards.params;

export const selectCardsCardsCardsTotalCount = (state: AppRootStateType): number =>
  state.cards.cardsTotalCount;
