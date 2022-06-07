import { AppRootStateType } from '../../store';

export const selectProfileProfileId = (state: AppRootStateType): string | null =>
  state.profile.profile._id;