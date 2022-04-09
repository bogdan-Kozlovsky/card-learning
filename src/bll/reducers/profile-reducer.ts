///////////////////////////////////////////// type ////////////////////////////////////////////
import {ProfileType, requestsApi} from "../../dal/api";
import {Dispatch} from "redux";

export type InitialStateType = {
    profile: ProfileType
}
type ActionType = | ReturnType<typeof userDateAC> | ReturnType<typeof updateProfileAC>

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
    }
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
 const profileReducer = (state: InitialStateType = initialState, action: ActionType) => {
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
 const userDateAC = (data: ProfileType) => {
    return {
        type: 'PROFILE/USER_DATE', data
    } as const
}
 const updateProfileAC = (data: ProfileType) =>
    ({type: 'PROFILE/UPDATE_PROFILE', data} as const)


///////////////////////////////////////////// Thunk ////////////////////////////////////////////
export const updateProfileTC =
    (data: { name: string; avatar: string }) => async (dispatch: Dispatch) => {
        try {
            const res = await requestsApi.updateProfile(data)
            dispatch(updateProfileAC(res.data))
        } catch (e) {
            console.log(e)
        }
    }