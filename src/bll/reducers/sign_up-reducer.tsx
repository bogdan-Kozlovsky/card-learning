///////////////////////////////////////////// type ////////////////////////////////////////////
import {Dispatch} from "redux";
import {requestsApi} from "../../dal/api";

type InitialStateType = {
    isRegistration: boolean
    registerError: string
}
type ActionType =
    | ReturnType<typeof signUpAC>
    | ReturnType<typeof registrationErrorAC>

///////////////////////////////////////////// initial state ////////////////////////////////////////////
const initialState: InitialStateType = {
    isRegistration: false,
    registerError: ''
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const sign_upReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "REGISTRATION/SIGN_UP": {
            return {...state, isRegistration: action.value}
        }
        case "REGISTRATION_ERROR": {
            return {...state, registerError: action.error}
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
export const registrationErrorAC = (error: string) => ({type: 'REGISTRATION_ERROR', error} as const)

///////////////////////////////////////////// thunk creator ////////////////////////////////////////////

export const requestRegistrationTC = (data: { email: string, password: string }) => (dispatch: Dispatch) => {
    requestsApi.registrationRequest(data)
        .then((res) => {
            dispatch(signUpAC(true))
        })
        .catch(error => {
            dispatch(registrationErrorAC(error.response.data.error))
            setTimeout(() => {
                dispatch(registrationErrorAC(''))
            }, 3000)
        })
}