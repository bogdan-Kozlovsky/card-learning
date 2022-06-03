import { PacksActionType } from '../../actionCreator/packs/types';

import { PacksParamsType, PackType } from './types';

type InitialStateType = typeof initialState;

const initialState = {
  cardPacks: [] as PackType[],
  error: '',
  minCardsCount: 0,
  maxCardsCount: 103,
  cardPacksTotalCount: 0,
  params: {
    packName: '',
    min: 0,
    max: 15,
    sortPacks: '0updated',
    page: 1,
    pageCount: 7,
    userId: '',
  } as PacksParamsType,
  page: 1,
};

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionType,
): InitialStateType => {
  switch (action.type) {
    case 'APP/INITIALIZED_PACKS':
      return { ...state, ...action.payload };

    case 'PACKS/SET-CURRENT-PAGE':
      return { ...state, params: { ...state.params, page: action.value } };

    case 'PACKS/SET-USER-ID':
      return { ...state, params: { ...state.params, userId: action.value } };

    case 'PACKS/SORT-PACKS':
      return { ...state, params: { ...state.params, sortPacks: action.sortPacks } };

    case 'PACKS/SET-SEARCH':
      return { ...state, params: { ...state.params, packName: action.searchValue } };

    case 'PACKS/DOUBLE-RANGE':
      return { ...state, params: { ...state.params, min: action.min, max: action.max } };

    default: {
      return state;
    }
  }
};
