import React, {useEffect} from 'react';
import Header from "../Header/Header";
import RoutesNav from "../../navigate/RoutesNav";
import {useDispatch} from "react-redux";
import {authMeTC} from "../../../bll/reducers/auth-reducer";
import LinearProgress from "@material-ui/core/LinearProgress";
import {ErrorSnackbar} from "../../error/Error";
import {useAppSelector} from "../../common/hook/hook";
import {selectAppStatus} from "../../../bll/selectors";

export const App = () => {
    const status = useAppSelector(selectAppStatus)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authMeTC())
    }, [])

    return (
        <div className="App">
            {status === "loading" &&
                <div style={{position: 'absolute', left: '0', right: '0', zIndex: '999'}}><LinearProgress/></div>}
            <Header/>
            <ErrorSnackbar/>
            <RoutesNav/>

        </div>
    );
}

