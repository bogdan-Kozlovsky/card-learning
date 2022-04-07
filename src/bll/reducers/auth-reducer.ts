import {requestsApi} from "../../dal/api";
import {Dispatch} from "redux";
import {userDateAC} from "./profile-reducer";
import {initializedAC} from "./app-reducer";


export const authMeTC = () => (dispatch: Dispatch) => {
    requestsApi.authMeRequest()
        .then((res) => {
            dispatch(userDateAC(res.data))
            dispatch(initializedAC(true))
        })
        .catch((err: string) => {
            alert('error authMe')
        })
}




