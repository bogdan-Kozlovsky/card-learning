import { RequestStatusType } from '../../reducers/app/types';
import { AppRootStateType } from '../../store';

export const selectAppInitialized = (state: AppRootStateType): boolean =>
  state.app.initialized;

export const selectAppStatus = (state: AppRootStateType): RequestStatusType =>
  state.app.status;
