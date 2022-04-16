import {requestsApi} from "../../dal/api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../store";
import {Dispatch} from "redux";

export type initialStateType = {
    cards: CardsType[],
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: Date
    _id: string
    more_id: string
}
const initialState = {
    cards: [] as CardsType[],
    cardsTotalCount: 1,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: "5eecf82a3ed8f700042f1186",
}

type ThunkType = ThunkAction<void, AppRootStateType, Dispatch<ActionType>, ActionType>

type ActionType =
    | ReturnType<typeof initializedCardsAC>
export const cardsReducer = (state: initialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "APP/INITIALIZED_CARDS": {
            return {...state, cards: action.cards}
        }
        default: {
            return state
        }
    }
}


export const initializedCardsAC = (cards: CardsType[]) => {
    return {
        type: 'APP/INITIALIZED_CARDS', cards
    } as const
}


// const id = useSelector<AppRootStateType,string>(state => state.packs)
export const getCardsTC = (packId: string | undefined): ThunkType => (dispatch, getState) => {
    requestsApi.getCards(packId)
        .then((res) => {
            console.log(res.data)
            dispatch(initializedCardsAC(res.data.cards))
        })
}

export const addCardsTC = (packId: string | undefined): ThunkType => (dispatch) => {
    const card = {
        cardsPack_id: packId,
        question: "no question",
    }
    requestsApi.addNewCards(packId, card)
        .then(res => {
            dispatch(getCardsTC(packId))
        })

}

export const deleteCardTC = (packId: string | undefined, cardId: string | undefined): ThunkType => (dispatch) => {

    requestsApi.deleteCard(cardId)
        .then(res => {
            dispatch(getCardsTC(packId))
        })
}

export const updateCardTC = (packId: string | undefined, _id: string): ThunkType => (dispatch) => {
    const card = {
        _id: _id,
        question: "new Card",
    }
    requestsApi.updateCard(card)
        .then(res => {
            dispatch(getCardsTC(packId))
        })
}