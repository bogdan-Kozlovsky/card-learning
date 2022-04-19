import {requestsApi} from "../../dal/api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../store";
import {Dispatch} from "redux";
import {getStatusAC} from "./app-reducer";

// export type initialStateType = {
//     cards: CardsType[],
//     cardsTotalCount: number
//     maxGrade: number
//     minGrade: number
//     page: number
//     pageCount: number
//     packUserId: string
// }

type InitialStateType = typeof initialState

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
    rating: number
}
const initialState = {
    cards: [] as CardsType[],
    cardsTotalCount: 1,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    packUserId: "5eecf82a3ed8f700042f1186",
    params: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 9,
        sortCards: '0updated',
        page: 1,
        pageCount: 7,
    } as CardsParamsType,
}

export type CardsParamsType = {
    cardAnswer: string,
    cardQuestion: string,
    cardsPack_id: string,
    min: number,
    max: number,
    sortCards: string,
    page: number,
    pageCount: number,
}

type ThunkType = ThunkAction<void, AppRootStateType, Dispatch<ActionType>, ActionType>

type ActionType =
    | ReturnType<typeof initializedCardsAC>
    | ReturnType<typeof getStatusAC>
    | ReturnType<typeof setCardsCurrentPageAC>

export const cardsReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "APP/INITIALIZED_CARDS": {
            return {...state, ...action.payload}
        }
        case "CARDS/SET-CARDS-CURRENT-PAGE":
            return {
                ...state, params: {
                    ...state.params, page: action.value
                }
            }
        default: {
            return state
        }
    }
}


export const initializedCardsAC = (cards: CardsType[]) => {
    return {
        type: 'APP/INITIALIZED_CARDS', payload: cards
    } as const
}

export const setCardsCurrentPageAC = (value: number) => {
    debugger
    return {
        type: 'CARDS/SET-CARDS-CURRENT-PAGE', value
    } as const
}


export const getCardsTC = (packId: string | undefined): ThunkType => (dispatch, getState) => {
    dispatch(getStatusAC('loading'))
    const {page, pageCount} = getState().cards.params
    requestsApi.getCards(packId, pageCount, page)
        .then((res) => {
            console.log(res.data)
            dispatch(initializedCardsAC(res.data))
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
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