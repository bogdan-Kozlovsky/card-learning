import React, {ChangeEvent, useState} from 'react';
import style from './login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {Navigate, NavLink} from "react-router-dom";
import {requestLoginTC} from "../../../bll/reducers/sign_in-reducer";
import {SuperButton} from "../../common/SuperButton/SuperButton";
import {SuperInput, SuperInputPassword} from "../../common/SuperInput/SuperInput";
import {ErrorSnackbar} from "../../error/Error";

export const Login = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState<string>('maxcardbogdan@gmail.com')
    const [password, setPassword] = useState<string>('Stupid23Stupid')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    // const isLogin = useSelector<AppRootStateType, boolean>(state => state.signIn.loginValue)

    const isLoginHandler = () => {
        dispatch(requestLoginTC({email, password, rememberMe}))
    }


    const onChangeHandlerEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    };
    const onChangeHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    };
    const onChangeHandlerChecked = (e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked);
    };

    // if (isLogin) {
    //     return <Navigate to='/profile'/>
    // }

    return (
        <div className="wrapperBox">
            <ErrorSnackbar/>
            <div className="boxMax">
                <h2 className="title">It-incubator</h2>
                <h3 className="subtitle">Sign In</h3>

                <label className="inputLabel">
                    Email
                    <SuperInput className={'input'} value={email} onChange={onChangeHandlerEmail}
                                type={'text'}/>
                </label>
                <label className="inputLabel">
                    Password
                    <SuperInputPassword className={'input'} value={password} onChange={onChangeHandlerPassword}/>
                </label>
                <label className="inputLabel inputLabelFlex">
                    Remember Me
                    <SuperInput type={'checkbox'} onChange={onChangeHandlerChecked} className='inputCheckbox'
                                checked={rememberMe} />
                </label>

                <div className={style.wrapperLink}>
                    <NavLink to={'/recovery-password'} className={style.forgotLink}>
                        Forgot Password
                    </NavLink>
                </div>
                <SuperButton name={'Login'} onClick={isLoginHandler} className="btnBlue"/>
                <div className='wrapperLinkCenter'>
                    <NavLink to={'/register'} className={style.forgotLink}>
                        Sign Up
                    </NavLink>
                </div>
            </div>
        </div>
    );
};