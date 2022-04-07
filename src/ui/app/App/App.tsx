import React, {useEffect} from 'react';
import Header from "../Header/Header";
import RoutesNav from "../../navigate/RoutesNav";
import {AppRootStateType} from "../../../bll/store";
import {useDispatch, useSelector} from "react-redux";
import {authMeTC} from "../../../bll/reducers/auth-reducer";
import {logoutTC} from "../../../bll/reducers/logout-reducer";

export const App = () => {
    const dispatch = useDispatch()
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)

    useEffect(() => {
        if (!initialized) {
            dispatch(authMeTC())
        }
    }, [])

    const logout = () => {
        dispatch(logoutTC())
    }

    return (
        <div className="App">
            <Header/>
            <RoutesNav/>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

