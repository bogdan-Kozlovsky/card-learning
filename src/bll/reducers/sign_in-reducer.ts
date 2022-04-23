import {Dispatch} from "redux";
import {ProfileType, requestsApi} from "../../dal/api";
import {authMeAC} from "./auth-reducer";
import {initializedAC, setAppErrorAC} from "./app-reducer";

///////////////////////////////////////////// type ////////////////////////////////////////////
export type InitialStateType = {
    profile: ProfileType
}
type ActionType =
    | ReturnType<typeof signInAC>


///////////////////////////////////////////// initial state ////////////////////////////////////////////

const initialState: InitialStateType = {
    profile: {
        avatar: '',
        created: null,
        deviceTokens: null,
        email: null,
        isAdmin: null,
        name: '',
        publicCardPacksCount: null,
        rememberMe: null,
        token: null,
        tokenDeathTime: null,
        updated: null,
        verified: null,
        __v: null,
        _id: null,
    },
}


///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const sign_inReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "LOGIN/SIGN_IN": {
            return {...state, profile: action.data}
        }
        default: {
            return state
        }
    }
}

///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const signInAC = (data: ProfileType, ) => {
    return {
        type: 'LOGIN/SIGN_IN', data,
    } as const
}

///////////////////////////////////////////// thunk creator ////////////////////////////////////////////
export const requestLoginTC = (data: { email: string, password: string, rememberMe: boolean }) => (dispatch: Dispatch) => {
    requestsApi.loginRequest(data)
        .then((res) => {
            dispatch(signInAC(res.data, ))
            dispatch(authMeAC(res.data))
            dispatch(initializedAC(true))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.response.data.error))
        })
}