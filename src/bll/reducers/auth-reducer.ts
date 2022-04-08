import {ProfileType, requestsApi} from "../../dal/api";
import {Dispatch} from "redux";
import {userDateAC} from "./profile-reducer";
import {initializedAC} from "./app-reducer";

export type InitialStateType = {
    profile: ProfileType
}

type ActionType = | ReturnType<typeof authMeAC>

///////////////////////////////////////////// initial state ////////////////////////////////////////////

const initialState: InitialStateType = {
    profile: {
        avatar: '',
        created: null,
        deviceTokens: null,
        email: null,
        isAdmin: null,
        name: null,
        publicCardPacksCount: null,
        rememberMe: null,
        token: null,
        tokenDeathTime: null,
        updated: null,
        verified: null,
        __v: null,
        _id: null,
    }
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const authReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "AUTH/AUTH_ME": {
            return {...state,profile:action.data}
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

///////////////////////////////////////////// thunk creator ////////////////////////////////////////////

export const authMeTC = () => async (dispatch: Dispatch) => {
    let res = await requestsApi.authMeRequest()
    try {

        dispatch(authMeAC(res.data))
        // dispatch(userDateAC(res.data))
        dispatch(initializedAC(true))
    } catch (e) {
        alert('error authMe')
    }
}




