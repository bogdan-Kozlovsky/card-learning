///////////////////////////////////////////// type ////////////////////////////////////////////
import {Dispatch} from "redux";
import {ProfileType, requestsApi} from "../../dal/api";
import {signInAC} from "./sign_in-reducer";

export type InitialStateType = {
    initialized: boolean
}
type ActionType = | ReturnType<typeof initializedAC>

///////////////////////////////////////////// initial state ////////////////////////////////////////////
const initialState: InitialStateType = {
    initialized: false,
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const appReducer = (state: InitialStateType = initialState, action: ActionType):InitialStateType => {
    switch (action.type) {
        case "APP/INITIALIZED": {
            return {...state, initialized: action.value}
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

