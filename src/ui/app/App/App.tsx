import React, {useEffect} from 'react';
import Header from "../Header/Header";
import RoutesNav from "../../navigate/RoutesNav";
import {AppRootStateType} from "../../../bll/store";
import {useDispatch, useSelector} from "react-redux";
import {authMeTC} from "../../../bll/reducers/auth-reducer";
import {logoutTC} from "../../../bll/reducers/app-reducer";
import {Loader} from "../../common/Loader/Loader";
import {SuperButton} from "../../common/SuperButton/SuperButton";

export const App = () => {
    const dispatch = useDispatch()
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const loader = useSelector<AppRootStateType, boolean>(state => state.auth.loader)

    useEffect(() => {
        if (!initialized) {
            dispatch(authMeTC())
        }
    }, [])


    const logout = () => {
        dispatch(logoutTC())
    }

    if (!loader) {
        return <Loader />
    }

    return (
        <div className="App">
            <Header/>
            <RoutesNav/>
            <SuperButton name={'Logout'} onClick={logout} />
        </div>
    );
}

