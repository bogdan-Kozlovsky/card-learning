import React from 'react';
import Login from "../auth/login/Login";
import Registration from "../auth/registration/Registration";
import Profile from "../profile/Profile";
import PasswordRecovery from "../auth/passwordRecovery/PasswordRecovery";
import Error404 from "../common/Error404/Error404";
import NewPassword from "../auth/newPassword/NewPassword";
import AuthEmailPassword from "../auth/AuthEmailPassword/AuthEmailPassword";
import { Navigate, Route, Routes,} from 'react-router-dom'

const RoutesNav = () => {
    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login />} />
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