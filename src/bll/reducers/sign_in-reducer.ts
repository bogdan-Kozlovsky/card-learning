///////////////////////////////////////////// type ////////////////////////////////////////////
import {Dispatch} from "redux";
import {requestsApi} from "../../dal/api";
import {userDateAC} from "./profile-reducer";

type InitialStateType = {
    isLogin: boolean
}
type ActionType = | ReturnType<typeof signInAC>

///////////////////////////////////////////// initial state ////////////////////////////////////////////
const initialState: InitialStateType = {
    isLogin: false,
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const sign_inReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "LOGIN/SIGN_IN": {
            return {...state, isLogin: action.value}
        }
        default: {
            return state
        }
    }
}

///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const signInAC = (value: boolean) => {
    return {
        type: 'LOGIN/SIGN_IN', value
    } as const
}

///////////////////////////////////////////// thunk creator ////////////////////////////////////////////
export const requestLoginTC = (data: { email: string, password: string, rememberMe: boolean }) => (dispatch: Dispatch) => {
    requestsApi.loginRequest(data)
        .then((res) => {
            dispatch(signInAC(true))
            dispatch(userDateAC(res.data))
        })
        .catch((err: string) => {
            alert('error login')
        })
}