import React, {ChangeEvent, useState} from 'react';
import {useParams} from "react-router-dom";
import {SuperButton} from "../../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {newPasswordTC} from "../../../bll/reducers/auth-reducer";
import {Navigate} from "react-router-dom";
import {SuperInput, SuperInputPassword} from "../../common/SuperInput/SuperInput";

export const NewPassword = () => {
    const dispatch = useDispatch()
    const {token} = useParams()
    const [password, setPassword] = useState<string>('Stupid23Stupid')
    const newPasswordValue = useSelector<AppRootStateType, boolean>(state => state.auth.newPasswordValue)

    const onChangeHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    };
    const sendData = () => {
        dispatch(newPasswordTC({password, resetPasswordToken: token}))
    }

    if (newPasswordValue) {
        return <Navigate to='/'/>
    }
    return (
        <div className="wrapperBox">
            <div className="boxMin">
                <h2 className="title">It-incubator</h2>
                <h3 className="subtitle">Create new password</h3>
                <label className="inputLabel">
                    Password
                    <SuperInputPassword className={'input'} value={password} onChange={onChangeHandlerPassword}/>
                </label>
                <p className="description">
                    {' '}
                    Create new password and we will send you further instructions to email
                </p>
                <SuperButton name={'Create new password'} className='btnBlue' onClick={sendData}/>
            </div>
        </div>
    );
};

