import {Dispatch} from "redux";
import {ProfileType, requestsApi} from "../../dal/api";
import {authMeAC} from "./auth-reducer";
import {initializedAC, setAppErrorAC} from "./app-reducer";

///////////////////////////////////////////// type ////////////////////////////////////////////
export type InitialStateType = {
    profile: ProfileType
    isLogin: boolean
}
type ActionType =
    | ReturnType<typeof signInAC>
    | ReturnType<typeof isLoginAC>


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
    isLogin: true,
}


///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const sign_inReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "LOGIN/SIGN_IN": {
            return {...state, profile: action.data}
        }
        case "LOGIN/IS-LOGIN": {
            // return {...state, ...action.payload}
            return {...state, isLogin: action.payload.value}
        }
        default: {
            return state
        }
    }
}

///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const signInAC = (data: ProfileType,) => {
    return {
        type: 'LOGIN/SIGN_IN', data,
    } as const
}
export const isLoginAC = (value: boolean,) => {
    return {
        type: 'LOGIN/IS-LOGIN', payload: {value},
    } as const
}

///////////////////////////////////////////// thunk creator ////////////////////////////////////////////
export const requestLoginTC = (data: { email: string, password: string, rememberMe: boolean }) => (dispatch: Dispatch) => {
    requestsApi.loginRequest(data)
        .then((res) => {
            dispatch(signInAC(res.data,))
            dispatch(authMeAC(res.data))
            dispatch(initializedAC(true))
            dispatch(isLoginAC(true))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.response.data.error))
        })
}