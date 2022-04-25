import React, {memo, useEffect} from 'react';
import {Header} from "../Header/Header";
import {RoutesNav} from "../../navigate/RoutesNav";
import {useDispatch} from "react-redux";
import {authMeTC} from "../../../bll/reducers/auth-reducer";
import LinearProgress from "@material-ui/core/LinearProgress";
import {ErrorSnackbar} from "../../error/Error";
import {useAppSelector} from "../../common/hook/hook";
import {selectAppStatus} from "../../../bll/selectors";
import useTheme from "../../common/hook/useTheme";
import style from './App.module.css'

export const App = memo(() => {
    const status = useAppSelector(selectAppStatus)
    const {theme, toggleTheme} = useTheme();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authMeTC())
    }, [])

    return (
        <div className={`App ${theme === 'dark' ? style.dark : style.light}`}>
            {status === "loading"
                &&
                <div className={style.linearProgress}><LinearProgress/></div>}
            <Header theme={theme} toggleTheme={toggleTheme}/>
            <RoutesNav theme={theme}/>
            <ErrorSnackbar/>
        </div>
    );
})

