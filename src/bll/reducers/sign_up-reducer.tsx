
///////////////////////////////////////////// type ////////////////////////////////////////////
import {Dispatch} from "redux";
import {requestsApi} from "../../dal/api";

type InitialStateType = {
    isRegistration: boolean
}
type ActionType = | ReturnType<typeof signUpAC>

///////////////////////////////////////////// initial state ////////////////////////////////////////////
const initialState: InitialStateType = {
    isRegistration: false,
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const sign_upReducer = (state: InitialStateType = initialState, action: ActionType):InitialStateType => {
    switch (action.type) {
        case "REGISTRATION/SIGN_UP": {
            return {...state, isRegistration: action.value}
        }
        default: {
            return state
        }
    }
}

///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const signUpAC = (value: boolean) => {
    return {
        type: 'REGISTRATION/SIGN_UP', value
    } as const
}
///////////////////////////////////////////// thunk creator ////////////////////////////////////////////

export const requestRegistrationTC = (data: { email: string, password: string }) => (dispatch: Dispatch) => {
    requestsApi.registrationRequest(data)
        .then((res) => {
            dispatch(signUpAC(true))
        })
        .catch(() => alert('error register'))
}