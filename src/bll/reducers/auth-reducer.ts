import {ProfileType, requestsApi} from "../../dal/api";
import {Dispatch} from "redux";
import {initializedAC} from "./app-reducer";
import {signInErrorAC} from "./sign_in-reducer";

export type InitialStateType = {
    profile: ProfileType
    loader: boolean
    authError: string
}

type ActionType =
    | ReturnType<typeof authMeAC>
    | ReturnType<typeof loaderAC>
    | ReturnType<typeof authErrorAC>

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
    loader: false,
    authError: '',
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "AUTH/AUTH_ME": {
            return {...state, profile: action.data}
        }
        case "AUTH/LOADER": {
            return {
                ...state, loader: action.value
            }
        }
        case "AUTH_ERROR": {
            return {...state, authError: action.error}
        }
        default: {
            return state
        }
    }
}

///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const authMeAC = (data: ProfileType,) => {
    return {
        type: 'AUTH/AUTH_ME', data,
    } as const
}
export const loaderAC = (value: boolean) => ({type: 'AUTH/LOADER', value} as const)
export const authErrorAC = (error: string) => ({type: 'AUTH_ERROR', error} as const)

///////////////////////////////////////////// thunk creator ////////////////////////////////////////////

export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(loaderAC(false))
    requestsApi.authMeRequest()
        .then((res) => {
            dispatch(initializedAC(true))
            dispatch(authMeAC(res.data))
        })
        .catch(error => {
            dispatch(authErrorAC(error.response.data.error))
            setTimeout(() => {
                dispatch(authErrorAC(''))
            }, 3000)
        })
        .finally(() => {
            dispatch(loaderAC(true))
        })
}




