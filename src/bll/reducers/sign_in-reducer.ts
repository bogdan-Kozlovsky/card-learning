import {Dispatch} from "redux";
import {ProfileType, requestsApi} from "../../dal/api";
import {authMeAC} from "./auth-reducer";

///////////////////////////////////////////// type ////////////////////////////////////////////
export type InitialStateType = {
    profile: ProfileType
    isLogin: boolean
}
type ActionType = | ReturnType<typeof signInAC>

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
    isLogin: false
}


///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const sign_inReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "LOGIN/SIGN_IN": {
            return {...state,profile:action.data, isLogin: action.value}
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

///////////////////////////////////////////// thunk creator ////////////////////////////////////////////
export const requestLoginTC = (data: { email: string, password: string, rememberMe: boolean }) => (dispatch: Dispatch) => {
    requestsApi.loginRequest(data)
        .then((res) => {
            dispatch(signInAC(res.data,true))
            // dispatch(userDateAC(res.data))
            dispatch(authMeAC(res.data))
        })
        .catch((err: string) => {
            alert('error login')
        })
}