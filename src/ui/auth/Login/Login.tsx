import React, {ChangeEvent, useState} from 'react';
import style from './login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {Navigate, useNavigate} from "react-router-dom";
import {requestLoginTC} from "../../../bll/reducers/sign_in-reducer";

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('nya-admin@nya.nya')
    const [password, setPassword] = useState<string>('1qazxcvBG')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.signIn.isLogin)
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    if (isLogin) {
        return <Navigate to='/profile'/>
    }
    const isLoginHandler = () => {
        dispatch(requestLoginTC({email, password, rememberMe}))
    }

    /// bag
    // if (initialized) {
    //     return <Navigate to='/profile'/>
    // }
    // if (initialized) {
    //     navigate('/profile')
    // }

    const onChangeHandlerEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    };
    const onChangeHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    };
    const onChangeHandlerChecked = (e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked);
    };
    return (
        <div className="wrapperBox">
            <div className="boxMax">
                <h2 className="title">It-incubator</h2>
                <h3 className="subtitle">Sign In</h3>
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
                <label className="inputLabel">
                    Remember Me
                    <input
                        className='inputCheckbox'
                        type="checkbox"
                        checked={rememberMe}
                        onChange={onChangeHandlerChecked}
                    />
                </label>

                <div className={style.wrapperLink}>
                    <a href="#" className={style.forgotLink}>
                        Forgot Password
                    </a>
                </div>

                <button onClick={isLoginHandler}
                        className="btnBlue">
                    Login
                </button>
                <button className="btn">Sign Up</button>
            </div>
        </div>
    );
};

