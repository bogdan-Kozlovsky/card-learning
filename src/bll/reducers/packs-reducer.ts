import {requestsApi} from "../../dal/api";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";
import {loaderAC} from "./auth-reducer";

type ThunkType = ThunkAction<void, AppRootStateType, Dispatch<ActionType>, ActionType>

export type InitialStateType = typeof initialState


export type PackType = {
    cardsCount: number | null
    created: Date | null
    // deckCover: string | null
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
    sortPacks: string // ?????
    packUserId: string // ?????
}

type ActionType =
    | ReturnType<typeof initializedPacksAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof loaderAC>
    | ReturnType<typeof getUserIdAC>
    | ReturnType<typeof setSortPacksAC>

///////////////////////////////////////////// initial state ////////////////////////////////////////////
const initialState = {
    cardPacks: [] as PackType[],
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
    page: 1
}

export type PacksParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string | null
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const packsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "APP/INITIALIZED_PACKS": {
            // return {...state, packs: action.packs.cardPacks, cardPacksTotalCount: action.packs.cardPacksTotalCount}
            return {...state, ...action.payload}
        }
        case "PACKS/SET-CURRENT-PAGE":
            return {
                ...state, params: {
                    ...state.params, page: action.value
                }
            }
        case "PACKS/SET-USER-ID":
            return {
                ...state, params: {
                    ...state.params, user_id: action.value
                }
            }
        case "PACKS/SORT-PACKS":
            return {
                ...state, params: {
                    ...state.params, sortPacks: action.sortPacks
                }
            }
        default: {
            return state
        }
    }
}


///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const initializedPacksAC = (packs: any) => {
    return {
        type: 'APP/INITIALIZED_PACKS', payload: packs
        // type: 'APP/INITIALIZED_PACKS', packs
    } as const
}
export const setCurrentPageAC = (value: number) => {
    return {
        type: 'PACKS/SET-CURRENT-PAGE', value
    } as const
}
export const getUserIdAC = (value: string | null) => {
    return {
        type: "PACKS/SET-USER-ID", value
    } as const
}

export const setSortPacksAC = (sortPacks: string) => {
    return {
        type: "PACKS/SORT-PACKS", sortPacks
    } as const
}

export const getPacksTC = (): ThunkType => (dispatch, getState) => {
    // dispatch(loaderAC(false))
    const state = getState().packs
    const {packName,page,max,min,user_id,pageCount,sortPacks} = state.params
    requestsApi.getPacks(page, 7, user_id, sortPacks)
        .then((res) => {
            console.log(res.data, 'dadadadada')
            dispatch(initializedPacksAC(res.data))
            // dispatch(setIdProfileAC(res.data.data._id))
        })
        .finally(() => {
            // dispatch(loaderAC(true))
        })
}

export const addPacksTC = (): ThunkType => (dispatch, getState) => {
    const newCard = {
        name: 'TeamTest',
        deckCover: 'Hello',
        private: false
    }
    requestsApi.addNewPack(newCard)
        .then((res) => {
            dispatch(getPacksTC())
        })
}
export const deletePackTC = (idPack: string): ThunkType => (dispatch, getState) => {
    requestsApi.deletePack(idPack)
        .then((res) => {
            dispatch(getPacksTC())
        })
}
export const updatePackNameTC = (idPack: string): ThunkType => (dispatch, getState) => {
    const newPackName = {
        _id: idPack,
        name: 'updatePackName',
    }
    requestsApi.updatePackNameTC(newPackName)
        .then((res) => {
            dispatch(getPacksTC())
        })
}