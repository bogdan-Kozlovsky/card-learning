import { PackType } from '../../reducers/packs/types';
import { AppRootStateType } from '../../store';

export const selectPacksParamsPage = (state: AppRootStateType): number =>
  state.packs.params.page;

export const selectPacksParamsSortPacks = (state: AppRootStateType): string =>
  state.packs.params.sortPacks;

export const selectPacksParamsUserId = (state: AppRootStateType): string | null =>
  state.packs.params.userId;

export const selectPacksParamsPackName = (state: AppRootStateType): string =>
  state.packs.params.packName;

export const selectPacksParamsMin = (state: AppRootStateType): number =>
  state.packs.params.min;

export const selectPacksParamsMax = (state: AppRootStateType): number =>
  state.packs.params.max;

export const selectPacksPageCount = (state: AppRootStateType): number =>
  state.packs.params.pageCount;

export const selectPacksCardsPacksTotalCount = (state: AppRootStateType): number =>
  state.packs.cardPacksTotalCount;

export const selectPacksCardsPacks = (state: AppRootStateType): PackType[] =>
  state.packs.cardPacks;
