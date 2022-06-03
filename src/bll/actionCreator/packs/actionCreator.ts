export const initializedPacksAC = (packs: any) =>
  ({ type: 'APP/INITIALIZED_PACKS', payload: packs } as const);

export const setCurrentPageAC = (value: number) =>
  ({ type: 'PACKS/SET-CURRENT-PAGE', value } as const);

export const getUserIdAC = (value: string | null) =>
  ({ type: 'PACKS/SET-USER-ID', value } as const);

export const setSortPacksAC = (sortPacks: string) =>
  ({ type: 'PACKS/SORT-PACKS', sortPacks } as const);

export const setSearchAC = (searchValue: string) =>
  ({ type: 'PACKS/SET-SEARCH', searchValue } as const);

export const doubleRangeAC = (min: number, max: number) =>
  ({ type: 'PACKS/DOUBLE-RANGE', min, max } as const);
