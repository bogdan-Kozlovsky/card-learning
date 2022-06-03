import { RequestStatusType } from '../../reducers/app/types';

export const initializedAC = (value: boolean) =>
  ({ type: 'APP/INITIALIZED', value } as const);

export const getStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/GET-STATUS', status } as const);

export const setAppErrorAC = (error: string | null) =>
  ({ type: 'APP/SET-ERROR', error } as const);
