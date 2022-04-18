import {ForgotPasswordType, ProfileType, requestsApi} from "../../dal/api";
import {Dispatch} from "redux";
import {initializedAC} from "./app-reducer";

export type InitialStateType = {
    profile: ProfileType
    loader: boolean
    authError: string
    forgotValue: boolean
    newPasswordValue: boolean
}

type ActionType =
    | ReturnType<typeof authMeAC>
    | ReturnType<typeof loaderAC>
    | ReturnType<typeof authErrorAC>
    | ReturnType<typeof forgotValueAC>
    | ReturnType<typeof newPasswordValueAC>

///////////////////////////////////////////// initial state ////////////////////////////////////////////

export const initialState: InitialStateType = {
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
    forgotValue: false,
    newPasswordValue: false
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/UPDATE_PROFILE": {
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
        case "FORGOT_VALUE": {
            return {...state, forgotValue: action.value}
        }
        case "NEW_PASSWORD_VALUE": {
            return {...state, newPasswordValue: action.value}
        }
        default: {
            return state
        }
    }
}

///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const authMeAC = (data: ProfileType,) => {
    return {
        type: "PROFILE/UPDATE_PROFILE", data,
    } as const
}
export const loaderAC = (value: boolean) => ({type: 'AUTH/LOADER', value} as const)
export const authErrorAC = (error: string) => ({type: 'AUTH_ERROR', error} as const)
export const forgotValueAC = (value: boolean) => ({type: 'FORGOT_VALUE', value} as const)
export const newPasswordValueAC = (value: boolean) => ({type: 'NEW_PASSWORD_VALUE', value} as const)

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
export const forgotPasswordTC = (data: ForgotPasswordType) => (dispatch: Dispatch) => {
    dispatch(loaderAC(false))
    requestsApi.forgotPassword(data)
        .then(res => {
            dispatch(forgotValueAC(true))
            // setTimeout(() => {
            //     dispatch(forgotValueAC(false))
            // }, 5000)
        })
        .catch(e => alert('e'))
        .finally(() => {
            dispatch(loaderAC(true))
        })
}


export const newPasswordTC = (data: { password: string, resetPasswordToken: string | undefined }) => (dispatch: Dispatch) => {
    dispatch(loaderAC(false))
    requestsApi.newPassword(data)
        .then(res => {
            dispatch(newPasswordValueAC(true))
        })
        .catch(e => alert('e'))
        .finally(() => {
            dispatch(loaderAC(true))
        })
}




