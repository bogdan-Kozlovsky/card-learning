import {requestsApi} from "../../dal/api";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";

export type ThunkType = ThunkAction<void, AppRootStateType, Dispatch<ActionType>, ActionType>
type InitialStateType = {
    error: string | null
    packs: Array<PackType>
    searchName: string
    min: number
    max: number
    sortPacks: string
    page: number
    packsPerPage: number
    currentPage: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    packCardsId: string
    packUserId: string
}


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
const initialState: InitialStateType = {
    error: null,
    packs: [],
    searchName: '',
    min: 0,
    max: 24,
    sortPacks: '',
    page: 1,
    packsPerPage: 10,
    currentPage: 1,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 24,
    packCardsId: '',
    packUserId: '',
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const cardsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
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
    const state = getState()
    const searchName = state.cards.searchName
    const min = state.cards.min
    const max = state.cards.max
    const sortPacks = state.cards.sortPacks
    const currentPage = state.cards.page
    const packsOnPage = state.cards.packsPerPage
    const myId = state.profile.profile._id

    console.log('state', state)

    requestsApi.getCards(searchName, min, max, sortPacks, currentPage, packsOnPage, myId)
        //     requestsApi.getCards()
        .then((res) => {
            console.log("res", res)
            dispatch(initializedCardsAC(res.data.cardPacks))
        })
}