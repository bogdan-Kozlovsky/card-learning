import React, {ChangeEvent, memo, useState} from 'react';
import style from './registration.module.css'
import {useDispatch} from "react-redux";
import {Navigate, NavLink} from 'react-router-dom';
import {requestRegistrationTC} from "../../../bll/reducers/sign_up-reducer";
import {SuperInputPassword} from "../../common/SuperInput/SuperInput";
import {ErrorSnackbar} from "../../error/Error";
import {selectSignUpIsRegistration} from "../../../bll/selectors";
import {useAppSelector} from "../../common/hook/hook";

export const Registration = memo(() => {
    const isRegistration = useAppSelector(selectSignUpIsRegistration)

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
            <ErrorSnackbar/>
            <div className="boxMax">
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
                    <SuperInputPassword className={'input'} value={password} onChange={onChangeHandlerPassword}/>
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
})

