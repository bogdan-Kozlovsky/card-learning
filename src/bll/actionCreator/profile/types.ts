import {
  setIdProfileAC,
  updateProfileAC,
  updateProfileNameAC,
  userDateAC,
} from './actionCreator';

export type ProfileActionType =
  | ReturnType<typeof userDateAC>
  | ReturnType<typeof updateProfileAC>
  | ReturnType<typeof updateProfileNameAC>
  | ReturnType<typeof setIdProfileAC>;
