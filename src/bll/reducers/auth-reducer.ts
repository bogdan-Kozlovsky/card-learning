import {ProfileType, requestsApi} from "../../dal/api";
import {Dispatch} from "redux";
import {initializedAC} from "./app-reducer";

export type InitialStateType = {
    profile: ProfileType
    loader: boolean
}

type ActionType =
    | ReturnType<typeof authMeAC>
    | ReturnType<typeof loaderAC>

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
    loader: false
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const authReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "AUTH/AUTH_ME": {
            return {...state, profile: action.data}
        }
        case "AUTH/LOADER":{
            return {
                ...state, loader: action.value
            }
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


///////////////////////////////////////////// thunk creator ////////////////////////////////////////////

export const authMeTC = () => async (dispatch: Dispatch) => {
    dispatch(loaderAC(false))
    try {
        let res = await requestsApi.authMeRequest()
        dispatch(initializedAC(true))
        dispatch(authMeAC(res.data))
        // dispatch(userDateAC(res.data))
    } catch (e) {
        alert('error authMe')
    } finally {
        dispatch(loaderAC(true))
    }
}




