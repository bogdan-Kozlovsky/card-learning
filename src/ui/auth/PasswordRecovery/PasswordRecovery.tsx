import React, {ChangeEvent, memo, useState} from 'react';
import style from './passwordRecovery.module.css'
import {Navigate, NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {forgotPasswordTC} from "../../../bll/reducers/auth-reducer";
import {SuperButton} from "../../common/SuperButton/SuperButton";
import {SuperInput} from "../../common/SuperInput/SuperInput";
import {ErrorSnackbar} from "../../error/Error";
import {selectAuthForgotValue} from "../../../bll/selectors";
import {useAppSelector} from "../../common/hook/hook";

export const PasswordRecovery = memo(() => {
    const forgotValue = useAppSelector(selectAuthForgotValue)

    const [email, setEmail] = useState<string>("maxcardbogdan@gmail.com")
    const dispatch = useDispatch()
    const data = {
        email,
        from: 'test-front-admin <ai73a@yandex.by>',
        message: `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href='http://localhost:3000/entering-new-password/$token$'>link</a>
        </div>`
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onClickHandler = () => {
        dispatch(forgotPasswordTC(data))
    }

    if (forgotValue) {
        return <Navigate to={'/auth-email-password'}/>
    }


    return (
        <div className="wrapperBox">
            <ErrorSnackbar/>
            <div className="boxMax">
                <h2 className="title">It-incubator</h2>
                <h3 className="subtitle">Forgot your password?</h3>
                <label className="inputLabel">
                    Email
                    <SuperInput className={'input'} value={email} onChange={onChangeHandler} type={'text'}/>
                </label>
                <p className="description">
                    Enter your email address and we will send you further instructions{' '}
                </p>
                <SuperButton name={'Send Instructions'} onClick={onClickHandler} className="btnBlue"/>
                <div className='wrapperLinkCenter'>
                    <NavLink to={'/auth-email-password'} className={style.forgotLink}>
                        Did you remember your password?
                    </NavLink>
                </div>
                <div className='wrapperLinkCenter'>
                    <NavLink to={'/'} className={style.forgotLink}>
                        Try login in
                    </NavLink>
                </div>
            </div>
        </div>
    );
})

