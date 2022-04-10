import React, {ChangeEvent, useState} from 'react';
import style from './passwordRecovery.module.css'
import {Navigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordTC} from "../../../bll/reducers/auth-reducer";
import {AppRootStateType} from "../../../bll/store";

export const PasswordRecovery = () => {
    const [email, setEmail] = useState<string>("nya-admin@nya.nya")

    const dispatch = useDispatch()
    const data = {
        email,
        from: 'test-front-admin <ai73a@yandex.by>',
        message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onClickHandler = () => {
        dispatch(forgotPasswordTC(data))
    }

    return (
        <div className="wrapperBox">
            <div className="boxMax">
                <h2 className="title">It-incubator</h2>
                <h3 className="subtitle">Forgot your password?</h3>
                <label className="inputLabel">
                    Email
                    <input value={email} onChange={onChangeHandler}
                           className='input'
                        // value={text}
                        // onChangeText={setText}
                           type="text"
                        // spanClassName={s.testSpanError}
                    />
                </label>
                <p className="description">
                    Enter your email address and we will send you further instructions{' '}
                </p>
                <button onClick={onClickHandler} className="btnBlue">Send Instructions</button>
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

