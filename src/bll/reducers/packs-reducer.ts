import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { requestsApi } from '../../dal/api';
import { AppRootStateType } from '../store';

import { getStatusAC, setAppErrorAC } from './app-reducer';

/// ////////////////////////////////////////// type ////////////////////////////////////////////
type ThunkType = ThunkAction<void, AppRootStateType, Dispatch<ActionType>, ActionType>;
type InitialStateType = typeof initialState;
export type PackType = {
  cardsCount: number | null;
  created: Date | null;
  grade: number | null;
  more_id: string | null;
  name: string;
  path: string | null;
  private: boolean;
  rating: number | null;
  shots: number | null;
  type: string | null;
  updated: Date | null;
  user_id: string | null;
  user_name: string | null;
  __v: number | null;
  _id: string;
};

// получаем
export type ResponseGetPacksType = {
  cardPacks: Array<PackType>;
  cardPacksTotalCount: number;
  minCardsCount: number | null;
  maxCardsCount: number | null;
  page: number | null;
  pageCount: number | null;
  sortPacks: string; // ?????
  packUserId: string; // ?????
};

type ActionType =
  | ReturnType<typeof initializedPacksAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof getUserIdAC>
  | ReturnType<typeof setSortPacksAC>
  | ReturnType<typeof setSearchAC>
  | ReturnType<typeof getStatusAC>
  | ReturnType<typeof doubleRangeAC>
  | ReturnType<typeof setAppErrorAC>;

/// ////////////////////////////////////////// initial state ////////////////////////////////////////////
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

export type PacksParamsType = {
  packName: string;
  min: number;
  max: number;
  sortPacks: string;
  page: number;
  pageCount: number;
  userId: string | null;
};

/// ////////////////////////////////////////// reducer ////////////////////////////////////////////
export const packsReducer = (
  state: InitialStateType = initialState,
  action: ActionType,
): InitialStateType => {
  switch (action.type) {
    case 'APP/INITIALIZED_PACKS': {
      return { ...state, ...action.payload };
    }
    case 'PACKS/SET-CURRENT-PAGE':
      return {
        ...state,
        params: {
          ...state.params,
          page: action.value,
        },
      };
    case 'PACKS/SET-USER-ID':
      return {
        ...state,
        params: {
          ...state.params,
          userId: action.value,
        },
      };
    case 'PACKS/SORT-PACKS':
      return {
        ...state,
        params: {
          ...state.params,
          sortPacks: action.sortPacks,
        },
      };
    case 'PACKS/SET-SEARCH':
      return {
        ...state,
        params: {
          ...state.params,
          packName: action.searchValue,
        },
      };
    case 'PACKS/DOUBLE-RANGE':
      return {
        ...state,
        params: {
          ...state.params,
          min: action.min,
          max: action.max,
        },
      };
    default: {
      return state;
    }
  }
};

/// ////////////////////////////////////////// action creator ////////////////////////////////////////////
export const initializedPacksAC = (packs: any) =>
  ({
    type: 'APP/INITIALIZED_PACKS',
    payload: packs,
  } as const);
export const setCurrentPageAC = (value: number) =>
  ({
    type: 'PACKS/SET-CURRENT-PAGE',
    value,
  } as const);
export const getUserIdAC = (value: string | null) =>
  ({
    type: 'PACKS/SET-USER-ID',
    value,
  } as const);

export const setSortPacksAC = (sortPacks: string) =>
  ({
    type: 'PACKS/SORT-PACKS',
    sortPacks,
  } as const);
export const setSearchAC = (searchValue: string) =>
  ({
    type: 'PACKS/SET-SEARCH',
    searchValue,
  } as const);

export const doubleRangeAC = (min: number, max: number) =>
  ({
    type: 'PACKS/DOUBLE-RANGE',
    min,
    max,
  } as const);

export const getPacksTC = (): ThunkType => (dispatch, getState) => {
  dispatch(getStatusAC('loading'));
  const state = getState().packs;
  const { packName, page, max, min, userId, pageCount, sortPacks } = state.params;
  requestsApi
    .getPacks(page, pageCount, userId, sortPacks, packName, min, max)
    .then(res => {
      dispatch(initializedPacksAC(res.data));
      dispatch(getStatusAC('succeeded'));
    })
    .catch(error => {
      dispatch(setAppErrorAC(error.response.data.error));
    });
};

export const addPacksTC =
  (name: string): ThunkType =>
  (dispatch, getState) => {
    requestsApi
      .addNewPack(name)
      .then(res => {
        dispatch(getPacksTC());
      })
      .catch(error => {
        dispatch(setAppErrorAC(error.response.data.error));
      });
  };
export const deletePackTC =
  (idPack: string): ThunkType =>
  (dispatch, getState) => {
    requestsApi
      .deletePack(idPack)
      .then(res => {
        dispatch(getPacksTC());
      })
      .catch(error => {
        dispatch(setAppErrorAC(error.response.data.error));
      });
  };
export const updatePackNameTC =
  (idPack: string, name: string | null): ThunkType =>
  (dispatch, getState) => {
    const newPackName = {
      _id: idPack,
      name,
    };
    requestsApi
      .updatePackNameTC(newPackName)
      .then(res => {
        dispatch(getPacksTC());
      })
      .catch(error => {
        dispatch(setAppErrorAC(error.response.data.error));
      });
  };
