import React, {useEffect} from 'react';
import Header from "../Header/Header";
import RoutesNav from "../../navigate/RoutesNav";
import {AppRootStateType} from "../../../bll/store";
import {useDispatch, useSelector} from "react-redux";
import {authMeTC} from "../../../bll/reducers/auth-reducer";
import {useNavigate} from 'react-router-dom';
import {logoutTC} from "../../../bll/reducers/app-reducer";

export const App = () => {
    const dispatch = useDispatch()
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)

    // не удалять, после удаления не работает redirect
    const loader = useSelector<AppRootStateType, boolean>(state => state.auth.loader)
    const navigate = useNavigate();
    // не удалять, после удаления не работает redirect

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

