import React from 'react';
import {NavLink} from "react-router-dom";

const Navigate = () => {
    const initialDate = [
        {to: '/login', name: 'Login'},
        {to: '/register', name: 'Registration'},
        {to: 'profile', name: 'Profile'},
        {to: 'recovery-password', name: 'RecoveryPassword'},
        {to: 'entering-new-password', name: 'EnteringNewPassword'},
        {to: 'auth-email-password', name: 'AuthEmailPassword'},
    ]
    return (
        <div>
            <ul style={{display: 'flex'}}>
                {initialDate.map((el) => (
                    <li style={{margin: '0 10px'}} key={`${el.to}${el.name}`}>
                        <NavLink to={el.to}>{el.name}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navigate;