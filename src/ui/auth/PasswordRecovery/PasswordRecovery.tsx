import React, {ChangeEvent, useState} from 'react';
import style from './passwordRecovery.module.css'
import {Navigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordTC} from "../../../bll/reducers/auth-reducer";
import {AppRootStateType} from "../../../bll/store";
import {SuperButton} from "../../common/SuperButton/SuperButton";
import {SuperInput} from "../../common/SuperInput/SuperInput";

export const PasswordRecovery = () => {
    const [email, setEmail] = useState<string>("maxcardbogdan@gmail.com")
    const forgotValue = useSelector<AppRootStateType, boolean>(state => state.auth.forgotValue)
    const dispatch = useDispatch()
    const data = {
        email,
        from: 'test-front-admin <ai73a@yandex.by>',
        message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/entering-new-password/$token$'>
link</a>
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

    // useEffect(() => {
    //
    // },[])

    return (
        <div className="wrapperBox">
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
};

