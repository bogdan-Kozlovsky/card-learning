import {requestsApi} from "../../dal/api";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";

export type ThunkType = ThunkAction<void, AppRootStateType, Dispatch<ActionType>, ActionType>

export type InitialStateType = typeof initialState


export type PackType = {
    cardsCount: number | null
    created: Date | null
    deckCover: string | null
    grade: number | null
    more_id: string | null
    name: string | null
    path: string | null
    private: boolean
    rating: number | null
    shots: number | null
    type: string | null
    updated: Date | null
    user_id: string | null
    user_name: string | null
    __v: number | null
    _id: string
}

// получаем
export type ResponseGetPacksType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    minCardsCount: number | null
    maxCardsCount: number | null
    page: number | null
    pageCount: number | null
    sortPacks: string
    packUserId: string
}

type ActionType = | ReturnType<typeof initializedCardsAC>

///////////////////////////////////////////// initial state ////////////////////////////////////////////
const initialState = {
    packs: [] as PackType[],
    error: '',
    minCardsCount: 0,
    maxCardsCount: 103,
    cardPacksTotalCount: 0,
    params: {
        packName: '',
        min: 3,
        max: 9,
        sortPacks: '0updated',
        page: 1,
        pageCount: 10,
        user_id: '',
    } as PacksParamsType,
}

export type PacksParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const packsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "APP/INITIALIZED_CARDS": {
            return {...state, packs: action.packs}
        }
        default: {
            return state
        }
    }
}

///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const initializedCardsAC = (packs: Array<PackType>) => {
    return {
        type: 'APP/INITIALIZED_CARDS', packs
    } as const
}

export const cardsTC = (): ThunkType => (dispatch, getState) => {

    const params = getState().packs.params
    requestsApi.getCards(params)
        .then((res) => {
            console.log("res", res)
            dispatch(initializedCardsAC(res.data.cardPacks))
        })
}