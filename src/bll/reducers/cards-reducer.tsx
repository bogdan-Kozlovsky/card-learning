import {requestsApi} from "../../dal/api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../store";
import {Dispatch} from "redux";
import {getStatusAC, setAppErrorAC} from "./app-reducer";

///////////////////////////////////////////// type ////////////////////////////////////////////
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
type UpdatedGradeType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}
type ThunkType = ThunkAction<void, AppRootStateType, Dispatch<ActionType>, ActionType>

type ActionType =
    | ReturnType<typeof initializedCardsAC>
    | ReturnType<typeof getStatusAC>
    | ReturnType<typeof setCardsCurrentPageAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setGradeCardAC>

///////////////////////////////////////////// initial state ////////////////////////////////////////////
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

///////////////////////////////////////////// reducer ////////////////////////////////////////////
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

///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const initializedCardsAC = (cards: CardsType[]) => {
    return {
        type: 'APP/INITIALIZED_CARDS', payload: cards
    } as const
}

export const setCardsCurrentPageAC = (value: number) => {
    return {
        type: 'CARDS/SET-CARDS-CURRENT-PAGE', value
    } as const
}

export const setGradeCardAC = (value: UpdatedGradeType) => {
    return {
        type: 'CARDS/SET-GRADE-CARD',
        value
    } as const
}

///////////////////////////////////////////// thunk creator ////////////////////////////////////////////
export const getCardsTC = (packId: string | undefined): ThunkType => (dispatch, getState) => {
    dispatch(getStatusAC('loading'))
    const {page, pageCount} = getState().cards.params
    requestsApi.getCards(packId, pageCount, page)
        .then((res) => {
            dispatch(initializedCardsAC(res.data))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.response.data.error))
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}
export const addCardsTC = (packId: string | undefined, title: string): ThunkType => (dispatch) => {
    requestsApi.addNewCards(packId, title)
        .then(res => {
            dispatch(getCardsTC(packId))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.response.data.error))
        })

}
export const deleteCardTC = (packId: string | undefined, cardId: string | undefined): ThunkType => (dispatch) => {
    requestsApi.deleteCard(cardId)
        .then(res => {
            dispatch(getCardsTC(packId))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.response.data.error))
        })
}
export const updateCardTC = (packId: string | undefined, _id: string, updateName: string): ThunkType => (dispatch) => {
    const card = {
        _id: _id,
        question: updateName,
    }
    requestsApi.updateCard(card)
        .then(res => {
            dispatch(getCardsTC(packId))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.response.data.error))
        })
}
export const gradeTC = (grade: number, card_id: string): ThunkType => (dispatch) => {
    const payload = {
        grade,
        card_id
    }
    requestsApi.gradeCard(payload)
        .then(res => {
            dispatch(setGradeCardAC(res.data))
        })
}