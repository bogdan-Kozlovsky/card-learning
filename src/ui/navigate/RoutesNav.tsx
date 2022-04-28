import React, {memo} from 'react';
import {Registration} from "../auth/Registration/Registration";
import {PasswordRecovery} from "../auth/PasswordRecovery/PasswordRecovery";
import {Error404} from "../common/Error404/Error404";
import {NewPassword} from "../auth/NewPassword/NewPassword";
import {AuthEmailPassword} from "../auth/AuthEmailPassword/AuthEmailPassword";
import {Navigate, Route, Routes,} from 'react-router-dom'
import {Learn} from "../learn/Learn";
import {Login} from "../auth/Login/Login";
import {ProfileContainer} from "../profile/ProfileContainer";
import {LoginNavigate} from "../auth/Login/LoginNavigate";
import {PacksContainer} from "../packs/PacksContainer";
import {CardsContainer} from "../cards/CardsContainer";
import {PATH} from "../enums/paths";

type propsType = {
    theme?: string
}

export const RoutesNav = memo((props: propsType) => {
    const {theme} = props
    return (
        <div className='container'>
            <Routes>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<LoginNavigate><ProfileContainer/> </LoginNavigate>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.EMAIL_PASSWORD} element={<AuthEmailPassword/>}/>
                <Route path={`${PATH.NEW_PASSWORD}:token`} element={<NewPassword/>}/>
                <Route path={PATH.PACKS} element={<LoginNavigate><PacksContainer/></LoginNavigate>}/>
                <Route path={`${PATH.LEARN}/:learnId`} element={<Learn/>}/>
                <Route path={`${PATH.CARDS}/:packId`} element={<CardsContainer/>}/>
                <Route path={PATH.ERROR_404} element={<Error404/>}/>
                <Route path='*' element={<Navigate to='404'/>}/>
            </Routes>
        </div>
    );
})

