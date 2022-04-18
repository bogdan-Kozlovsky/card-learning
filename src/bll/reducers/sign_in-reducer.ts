import {Dispatch} from "redux";
import {ProfileType, requestsApi} from "../../dal/api";
import {authMeAC} from "./auth-reducer";

///////////////////////////////////////////// type ////////////////////////////////////////////
export type InitialStateType = {
    profile: ProfileType
    isLogin: boolean
    loginError: string
}
type ActionType =
    | ReturnType<typeof signInAC>
    | ReturnType<typeof signInErrorAC>


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
    isLogin: false,
    loginError: '',
}


///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const sign_inReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "LOGIN/SIGN_IN": {
            return {...state, profile: action.data, isLogin: action.value}
        }
        case "LOGIN_ERROR": {
            return {...state, loginError: action.error}
        }
        default: {
            return state
        }
    }
}

///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const signInAC = (data: ProfileType, value: boolean) => {
    return {
        type: 'LOGIN/SIGN_IN', data, value
    } as const
}
export const signInErrorAC = (error: string) => ({type: 'LOGIN_ERROR', error} as const)

///////////////////////////////////////////// thunk creator ////////////////////////////////////////////
export const requestLoginTC = (data: { email: string, password: string, rememberMe: boolean }) => (dispatch: Dispatch) => {
    requestsApi.loginRequest(data)
        .then((res) => {
            dispatch(signInAC(res.data, true))
            dispatch(authMeAC(res.data))
        })
        .catch(error => {
            dispatch(signInErrorAC(error.response.data.error))
            setTimeout(() => {
                dispatch(signInErrorAC(''))
            }, 3000)
        })
}