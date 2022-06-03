import { instance } from '../config';
import { NewCardType, UpdatePackNameType } from '../types';

export const packsApi = {
  getPacks(
    page: number,
    pageCount: number,
    user_id: string | null,
    sortPacks: string = '1cardsCount',
    packName: string,
    min: number,
    max: number,
  ) {
    return instance.get(`cards/pack`, {
      params: { page, pageCount, user_id, sortPacks, packName, min, max },
    });
  },

  addNewPack(name: string) {
    return instance.post<NewCardType>(`cards/pack`, { cardsPack: { name } });
  },

  deletePack(id: string) {
    return instance.delete<NewCardType>(`cards/pack`, { params: { id } });
  },

  updatePackNameTC(newPackName: UpdatePackNameType) {
    return instance.put(`cards/pack`, { cardsPack: newPackName });
  },
};
