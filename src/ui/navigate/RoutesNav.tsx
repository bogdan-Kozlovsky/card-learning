import React from 'react';
import {Login} from "../auth/Login/Login";
import {Registration} from "../auth/Registration/Registration";
import {PasswordRecovery} from "../auth/PasswordRecovery/PasswordRecovery";
import {Error404} from "../common/Error404/Error404";
import {NewPassword} from "../auth/NewPassword/NewPassword";
import {AuthEmailPassword} from "../auth/AuthEmailPassword/AuthEmailPassword";
import {Navigate, Route, Routes,} from 'react-router-dom'
import {Packs} from "../packs/Packs";
import {Cards} from "../cards/Cards";
import UpdateProfile from "../Profile/updateProfile/UpdateProfile";
import {Profile} from '../Profile/Profile'


const RoutesNav = () => {
    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/register' element={<Registration/>}/>
                <Route path='/profile' element={<Profile/>}/>
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
                <Route path='/packs_list' element={<Packs/>}/>
                <Route path='/packs_list_cards/:packId' element={<Cards/>}/>
                <Route path='/update-profile' element={<UpdateProfile/>}/>
            </Routes>
        </div>
    );
};

export default RoutesNav;