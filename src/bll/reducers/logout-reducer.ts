///////////////////////////////////////////// type ////////////////////////////////////////////
import {Dispatch} from "redux";
import {requestsApi} from "../../dal/api";

type InitialStateType = {}
type ActionType = | ReturnType<typeof logoutMeAC>

///////////////////////////////////////////// initial state ////////////////////////////////////////////
const initialState: InitialStateType = {}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const appReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "LOGOUT/LOGOUT": {
            return {...state, initialized: false}
        }
        default: {
            return state
        }
    }
}

///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const logoutMeAC = () => {
    return {
        type: 'LOGOUT/LOGOUT'
    }
}

///////////////////////////////////////////// thunk creator ////////////////////////////////////////////
export const logoutTC = () => (dispatch: Dispatch) => {
    requestsApi.logoutRequest()
        .then((res) => {
            dispatch(logoutMeAC())
        })
        .catch((err: string) => {
            alert('error logout')
        })
}