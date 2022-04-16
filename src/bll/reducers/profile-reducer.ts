///////////////////////////////////////////// type ////////////////////////////////////////////
import {ProfileType, requestsApi} from "../../dal/api";
import {Dispatch} from "redux";

export type InitialStateType = {
    profile: ProfileType
    myId: null | string
}
type ActionType = | ReturnType<typeof userDateAC>
    | ReturnType<typeof updateProfileAC>
    | ReturnType<typeof updateProfileNameAC>
    | ReturnType<typeof setIdProfileAC>

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
    myId: null
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const profileReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'PROFILE/USER_DATE': {
            return {...state, ...action.data}
        }
        case "PROFILE/UPDATE_PROFILE_NAME": {
            return {
                ...state, profile: {
                    ...state.profile,
                    name: action.name
                }
            }
        }
        case "PROFILE/UPDATE_PROFILE": {
            return {
                ...state, profile: {
                    ...action.data
                }
            }
        }
        case "PROFILE-SET_MY_ID": {
            return {...state, myId: action.myId}
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
export const updateProfileNameAC = (name: string) =>
    ({type: 'PROFILE/UPDATE_PROFILE_NAME', name} as const)
export const setIdProfileAC = (myId: string | null) => ({type: 'PROFILE-SET_MY_ID', myId} as const)


///////////////////////////////////////////// Thunk ////////////////////////////////////////////
export const updateProfileTC = (name: string, avatar: any) => (dispatch: Dispatch) => {
    requestsApi.updateProfile(name, avatar)
        .then(res => {
            dispatch(updateProfileAC(res.data.updatedUser))
            dispatch(updateProfileNameAC(name))
        })


}