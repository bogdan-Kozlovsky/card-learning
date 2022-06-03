import { getStatusAC, initializedAC, setAppErrorAC } from './actionCreator';

export type AppActionType =
  | ReturnType<typeof initializedAC>
  | ReturnType<typeof getStatusAC>
  | ReturnType<typeof setAppErrorAC>;
