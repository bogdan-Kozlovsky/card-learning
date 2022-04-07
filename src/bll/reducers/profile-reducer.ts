///////////////////////////////////////////// type ////////////////////////////////////////////
import {ProfileType} from "../../dal/api";

type InitialStateType = {
    profile: ProfileType
}
type ActionType = | ReturnType<typeof userDateAC>

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
export const sign_inReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'PROFILE/USER_DATE': {
            return {...state, ...action.data}
        }
        default: {
            return state
        }
    }
}

///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const userDateAC = (data: ProfileType) => {
    return {
        type: 'PROFILE/USER_DATE', data
    }as const
}