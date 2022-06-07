import { AppRootStateType } from '../../store';

export const selectError = (state: AppRootStateType): string | null => state.app.error;