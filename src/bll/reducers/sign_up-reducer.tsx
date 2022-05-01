import {Dispatch} from "redux";
import {requestsApi} from "../../dal/api";
import {setAppErrorAC} from "./app-reducer";
///////////////////////////////////////////// type ////////////////////////////////////////////
type InitialStateType = {
    isRegistration: boolean
    registerError: string
}
type ActionType =
    | ReturnType<typeof signUpAC>

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
        .catch(error => {
            dispatch(setAppErrorAC(error.response.data.error))
        })
}