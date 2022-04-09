import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {sign_upReducer} from "./reducers/sign_up-reducer";
import {sign_inReducer} from "./reducers/sign_in-reducer";
import {appReducer} from "./reducers/app-reducer";
import {authReducer} from "./reducers/auth-reducer";

export const rootReducer = combineReducers({
    signUp: sign_upReducer,
    signIn: sign_inReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>