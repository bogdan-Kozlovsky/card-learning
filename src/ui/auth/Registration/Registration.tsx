import React, {ChangeEvent, useState} from 'react';
import style from './registration.module.css'
import {useDispatch, useSelector} from "react-redux";
import {Navigate, NavLink} from 'react-router-dom';
import {AppRootStateType} from "../../../bll/store";
import {requestRegistrationTC} from "../../../bll/reducers/sign_up-reducer";

export const Registration = () => {
    const isRegistration = useSelector<AppRootStateType, boolean>(state => state.signUp.isRegistration)
    const registerError = useSelector<AppRootStateType, string>(state => state.signUp.registerError)

    const dispatch = useDispatch()
    const [email, setEmail] = useState<string>('maxcardbogdan@gmail.com');
    const [password, setPassword] = useState<string>('Stupid23Stupid');

    if (isRegistration) {
        return <Navigate to='/'/>
    }
    // callBack
    const onChangeHandlerEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    };
    const onChangeHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    };
    const sendRegistrationRequest = () => {
        dispatch(requestRegistrationTC({email, password}))
    }

    return (
        <div className="wrapperBox">
            <div className="boxMax">
                {registerError && <div className='error'>{registerError}</div>}
                <h2 className="title">It-incubator</h2>
                <h3 className="subtitle">Sign Up</h3>
                <label className="inputLabel">
                    Email
                    <input
                        className='input'
                        value={email}
                        onChange={onChangeHandlerEmail}
                        type="text"
                    />
                </label>
                <label className="inputLabel">
                    Password
                    <input
                        className='input'
                        value={password}
                        onChange={onChangeHandlerPassword}
                        type="password"
                    />
                </label>
                <div className={style.buttons}>
                    <NavLink to={'/'} className={style.cancel}>
                        Cancel
                    </NavLink>
                    <button
                        onClick={sendRegistrationRequest}
                        className={style.btnRegister}
                    >Register
                    </button>
                </div>
            </div>
        </div>
    );
};

