import React, {useEffect} from 'react';
import Header from "../Header/Header";
import RoutesNav from "../../navigate/RoutesNav";
import {AppRootStateType} from "../../../bll/store";
import {useDispatch, useSelector} from "react-redux";
import {authMeTC} from "../../../bll/reducers/auth-reducer";
import {Loader} from "../../common/Loader/Loader";
import {Navigate, useNavigate} from 'react-router-dom';
import {logoutTC} from "../../../bll/reducers/app-reducer";

export const App = () => {
    const dispatch = useDispatch()
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const loader = useSelector<AppRootStateType, boolean>(state => state.auth.loader)
    const navigate = useNavigate();
    console.log(initialized)

    useEffect(() => {
        if (!initialized) {
            dispatch(authMeTC())
        }
    }, [])

    // useEffect(() => {
    //     if (!initialized) {
    //         navigate('/')
    //     }
    // }, [initialized])

    // if (!loader) {
    //     return <Loader/>
    // }

    const logout = () => {
        dispatch(logoutTC())

    }
// if(!initialized) navigate('/')

    return (
        <div className="App">
            <Header/>
            <RoutesNav/>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

