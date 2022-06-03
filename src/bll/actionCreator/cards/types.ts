import { getStatusAC, setAppErrorAC } from "../app/actionCreator";

import { initializedCardsAC, setCardsCurrentPageAC, setGradeCardAC } from "./actionCreator";

export type CardsActionType =
  | ReturnType<typeof initializedCardsAC>
  | ReturnType<typeof getStatusAC>
  | ReturnType<typeof setCardsCurrentPageAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setGradeCardAC>;