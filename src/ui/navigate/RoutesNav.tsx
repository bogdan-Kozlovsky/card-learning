import React from 'react';
import {Registration} from "../auth/Registration/Registration";
import {PasswordRecovery} from "../auth/PasswordRecovery/PasswordRecovery";
import {Error404} from "../common/Error404/Error404";
import {NewPassword} from "../auth/NewPassword/NewPassword";
import {AuthEmailPassword} from "../auth/AuthEmailPassword/AuthEmailPassword";
import {Navigate, Route, Routes,} from 'react-router-dom'
import {Packs} from "../packs/Packs";
import {Cards} from "../cards/Cards";
import {Learn} from "../learn/Learn";
import {LearnAnswer} from "../learn/LearnAnswer";
import Login from "../auth/Login/Login";
import ProfileContainer from "../profile/ProfileContainer";
import {LoginNavigate} from "../auth/Login/LoginNavigate";

type propsType = {
    theme?: string
}
const RoutesNav = (props: propsType) => {
    const {theme} = props
    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<Login theme={theme}/>}/>
                <Route path='/register' element={<Registration/>}/>
                <Route path='/profile' element={<LoginNavigate><ProfileContainer/></LoginNavigate>}/>
                <Route path='recovery-password' element={<PasswordRecovery/>}/>
                <Route
                    path='auth-email-password'
                    element={<AuthEmailPassword/>}
                />
                <Route
                    path='entering-new-password/:token'
                    element={<NewPassword/>}
                />
                <Route path='404' element={<Error404/>}/>
                <Route path='*' element={<Navigate to='404'/>}/>
                <Route path='/packs_list' element={<LoginNavigate><Packs/></LoginNavigate>}/>
                <Route path='/packs_list/link' element={<Learn/>}/>
                <Route path='/packs_list/link/answer' element={<LearnAnswer/>}/>
                <Route path='/packs_list_cards/:packId' element={<LoginNavigate><Cards/></LoginNavigate>}/>
            </Routes>
        </div>
    );
};

export default RoutesNav;