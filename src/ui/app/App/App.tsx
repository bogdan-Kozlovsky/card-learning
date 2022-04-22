import React, {useEffect} from 'react';
import Header from "../Header/Header";
import RoutesNav from "../../navigate/RoutesNav";
import {AppRootStateType} from "../../../bll/store";
import {useDispatch, useSelector} from "react-redux";
import {authMeTC} from "../../../bll/reducers/auth-reducer";
import {logoutTC} from "../../../bll/reducers/app-reducer";
import {SuperButton} from "../../common/SuperButton/SuperButton";
import LinearProgress from "@material-ui/core/LinearProgress";

export const App = () => {
    const dispatch = useDispatch()
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const status = useSelector<AppRootStateType, null | string>(state => state.app.status)


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
            {status === "loading" &&
                <div style={{position: 'absolute', left: '0', right: '0', zIndex: '999'}}><LinearProgress/></div>}
            <Header/>
            <RoutesNav/>
            <SuperButton name={'Logout'} onClick={logout}/>
        </div>
    );
}

