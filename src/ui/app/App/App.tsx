import React, {useEffect} from 'react';
import Header from "../Header/Header";
import RoutesNav from "../../navigate/RoutesNav";
import {useDispatch} from "react-redux";
import {authMeTC} from "../../../bll/reducers/auth-reducer";
import LinearProgress from "@material-ui/core/LinearProgress";
import {ErrorSnackbar} from "../../error/Error";
import {useAppSelector} from "../../common/hook/hook";
import {selectAppStatus} from "../../../bll/selectors";
import useTheme from "../../common/hook/useTheme";
import style from './App.module.css'

export const App = () => {
    const status = useAppSelector(selectAppStatus)
    const {theme, toggleTheme} = useTheme();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authMeTC())
    }, [])

    return (
        <div className={`App ${theme === 'dark' ? style.dark : style.light}`}>
            {status === "loading" &&
                <div style={{position: 'absolute', left: '0', right: '0', zIndex: '999'}}><LinearProgress/></div>}
            <Header theme={theme} toggleTheme={toggleTheme}/>
            <ErrorSnackbar/>
            <RoutesNav theme={theme}/>
        </div>
    );
}

