///////////////////////////////////////////// type ////////////////////////////////////////////
import {Dispatch} from "redux";
import {ProfileType, requestsApi} from "../../dal/api";
import {signInAC} from "./sign_in-reducer";

export type RequestStatusType = 'loading' | 'succeeded'
export type InitialStateType = {
    initialized: boolean
    status: RequestStatusType
}
type ActionType = | ReturnType<typeof initializedAC> | ReturnType<typeof getStatusAC>

///////////////////////////////////////////// initial state ////////////////////////////////////////////
const initialState: InitialStateType = {
    initialized: false,
    status: "loading",
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

// ///////////////////////////////////////////// thunk creator ////////////////////////////////////////////
export const logoutTC = () => (dispatch: Dispatch) => {
    requestsApi.logoutRequest()
        .then((res) => {
            dispatch(signInAC({} as ProfileType, false))
            dispatch(initializedAC(false))
        })
        .catch((err: string) => {
            alert('error logout')
        })
}

