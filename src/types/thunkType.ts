import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { AppRootStateType } from "../bll/store";

export type ThunkType = ThunkAction<void, AppRootStateType, unknown, AnyAction>