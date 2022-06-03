import { instance } from '../config';

export const cardsApi = {
  getCards(cardsPack_id: string | undefined, pageCount: number, page: number) {
    return instance.get(`cards/card`, { params: { cardsPack_id, pageCount, page } });
  },

  addNewCards(packId: string | undefined, name: string) {
    return instance.post(`cards/card`, {
      card: { cardsPack_id: packId, question: name },
    });
  },

  deleteCard(cardId: string | undefined) {
    return instance.delete(`cards/card?id=${cardId}`);
  },

  updateCard(card: { _id: string; question: string }) {
    return instance.put(`/cards/card`, { card });
  },

  gradeCard(payload: { grade: number; card_id: string }) {
    return instance.put(`/cards/grade`, payload);
  },
};
