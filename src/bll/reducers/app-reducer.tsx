///////////////////////////////////////////// type ////////////////////////////////////////////
import {Dispatch} from "redux";
import {ProfileType, requestsApi} from "../../dal/api";
import {signInAC} from "./sign_in-reducer";

export type RequestStatusType = 'loading' | 'succeeded'
export type InitialStateType = {
    initialized: boolean
    status: RequestStatusType
    error: string | null
}
type ActionType =
    | ReturnType<typeof initializedAC>
    | ReturnType<typeof getStatusAC>
    | ReturnType<typeof setAppErrorAC>

///////////////////////////////////////////// initial state ////////////////////////////////////////////
const initialState: InitialStateType = {
    initialized: false,
    status: "loading",
    error: null,
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "APP/INITIALIZED": {
            return {...state, initialized: action.value}
        }
        case "APP/GET-STATUS": {
            return {
                ...state, status: action.status
            }
        }
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default: {
            return state
        }
    }
}

///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const initializedAC = (value: boolean) => {
    return {
        type: 'APP/INITIALIZED', value
    } as const
}
export const getStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/GET-STATUS', status
    } as const
}
export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR', error
    } as const
}

// ///////////////////////////////////////////// thunk creator ////////////////////////////////////////////
export const logoutTC = () => (dispatch: Dispatch) => {
    requestsApi.logoutRequest()
        .then((res) => {
            dispatch(signInAC({} as ProfileType, false))
            dispatch(initializedAC(false))
        })
        .catch((error: any) => {
            dispatch(setAppErrorAC(error.response.data.error))
        })
}

