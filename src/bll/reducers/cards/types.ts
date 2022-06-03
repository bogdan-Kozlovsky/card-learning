import { initialState } from './cards-reducer';

export type InitialStateType = typeof initialState;

export type CardsType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: string;
  updated: Date;
  _id: string;
  more_id: string;
  rating: number;
};
export type CardsParamsType = {
  cardAnswer: string;
  cardQuestion: string;
  cardsPack_id: string;
  min: number;
  max: number;
  sortCards: string;
  page: number;
  pageCount: number;
};
export type UpdatedGradeType = {
  _id: string;
  cardsPack_id: string;
  card_id: string;
  user_id: string;
  grade: number;
  shots: number;
};
