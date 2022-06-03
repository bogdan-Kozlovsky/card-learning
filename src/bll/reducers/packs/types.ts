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

export type PacksParamsType = {
  packName: string;
  min: number;
  max: number;
  sortPacks: string;
  page: number;
  pageCount: number;
  userId: string | null;
};
