export type RequestStatusType = 'loading' | 'succeeded';
export type InitialStateType = {
  initialized: boolean;
  status: RequestStatusType;
  error: string | null;
};
