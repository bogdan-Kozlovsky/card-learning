import React from 'react';
import {Login} from "../auth/Login/Login";
import {Registration} from "../auth/Registration/Registration";
import {PasswordRecovery} from "../auth/PasswordRecovery/PasswordRecovery";
import {Error404} from "../common/Error404/Error404";
import {NewPassword} from "../auth/NewPassword/NewPassword";
import {AuthEmailPassword} from "../auth/AuthEmailPassword/AuthEmailPassword";
import { Navigate, Route, Routes,} from 'react-router-dom'
import {Profile} from "../Profile/Profile";

const RoutesNav = () => {
    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Registration />} />
                <Route path='/profile' element={<Profile />} />
                <Route
                    path='recovery-password'
                    element={<PasswordRecovery />}
                />
                <Route
                    path='auth-email-password'
                    element={<AuthEmailPassword />}
                />
                <Route
                    path='entering-new-password'
                    element={<NewPassword />}
                />
                <Route path='404' element={<Error404 />} />
                <Route path='*' element={<Navigate to='404' />} />
            </Routes>
        </div>
    );
};

export default RoutesNav;