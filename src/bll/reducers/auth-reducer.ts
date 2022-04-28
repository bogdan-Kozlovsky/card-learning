import {ForgotPasswordType, ProfileType, requestsApi} from "../../dal/api";
import {Dispatch} from "redux";
import {getStatusAC, initializedAC, setAppErrorAC} from "./app-reducer";
import {isLoginAC} from "./sign_in-reducer";

export type InitialStateType = {
    profile: ProfileType
    forgotValue: boolean
    newPasswordValue: boolean
}

type ActionType =
    | ReturnType<typeof authMeAC>
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
    forgotValue: false,
    newPasswordValue: false,
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/UPDATE_PROFILE": {
            return {...state, profile: action.data}
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
export const forgotValueAC = (value: boolean) => ({type: 'FORGOT_VALUE', value} as const)
export const newPasswordValueAC = (value: boolean) => ({type: 'NEW_PASSWORD_VALUE', value} as const)

///////////////////////////////////////////// thunk creator ////////////////////////////////////////////

export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(getStatusAC('loading'))
    requestsApi.authMeRequest()
        .then((res) => {
            dispatch(initializedAC(true))
            dispatch(isLoginAC(true))
            dispatch(authMeAC(res.data))
        })
        .catch(error => {
            dispatch(isLoginAC(false))
            dispatch(initializedAC(true))
            dispatch(setAppErrorAC(error.response.data.error))
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}
export const forgotPasswordTC = (data: ForgotPasswordType) => (dispatch: Dispatch) => {
    dispatch(getStatusAC('loading'))
    requestsApi.forgotPassword(data)
        .then(res => {
            dispatch(forgotValueAC(true))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.response.data.error))
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}


export const newPasswordTC = (data: { password: string, resetPasswordToken: string | undefined }) => (dispatch: Dispatch) => {
    dispatch(getStatusAC('loading'))
    requestsApi.newPassword(data)
        .then(res => {
            dispatch(newPasswordValueAC(true))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.response.data.error))
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}




