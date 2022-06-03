import { getStatusAC, setAppErrorAC } from "../app/actionCreator";

import {
  doubleRangeAC,
  getUserIdAC,
  initializedPacksAC,
  setCurrentPageAC,
  setSearchAC,
  setSortPacksAC
} from "./actionCreator";

export type PacksActionType =
  | ReturnType<typeof initializedPacksAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof getUserIdAC>
  | ReturnType<typeof setSortPacksAC>
  | ReturnType<typeof setSearchAC>
  | ReturnType<typeof getStatusAC>
  | ReturnType<typeof doubleRangeAC>
  | ReturnType<typeof setAppErrorAC>;