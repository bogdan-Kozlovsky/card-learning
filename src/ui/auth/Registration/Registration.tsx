import React, {memo, useState} from 'react';
import style from './registration.module.css'
import {useDispatch} from "react-redux";
import {Navigate, NavLink} from 'react-router-dom';
import {requestRegistrationTC} from "../../../bll/reducers/sign_up-reducer";
import {ErrorSnackbar} from "../../error/Error";
import {selectSignUpIsRegistration} from "../../../bll/selectors";
import {useAppSelector} from "../../common/hook/hook";
import {SuperInputPassword} from "../../common/SuperInput/SuperInputPassword";
import {useFormik} from "formik";
import {SuperInput} from "../../common/SuperInput/SuperInput";
import openShow from "../../assets/images/openShow.svg";
import closeShow from "../../assets/images/closeShow.svg";
import {PATH} from "../../enums/paths";
import {checkValidation} from "../../common/checkValidation";


export const Registration = memo(() => {
    const isRegistration = useAppSelector(selectSignUpIsRegistration)

    const dispatch = useDispatch()
    const [disable, setDisable] = useState<boolean>(false)
    const [isShownVoice, setIsShownVoice] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)


    // @ts-ignore
    const formik = useFormik({
        initialValues: {
            email: 'maxcardbogdan@gmail.com',
            password: 'Stupid23Stupid',
            rememberMe: true
        },

        validate: (values) => {
            return checkValidation(formik, values, setDisable)
        },
        onSubmit: data => {
            dispatch(requestRegistrationTC(data))
            setDisable(true)
            formik.resetForm()
        },
    })

    if (isRegistration) {
        return <Navigate to={PATH.LOGIN}/>
    }
    // callBack
    const onHandlerShow = () => {
        handlerShowPassword()
        setIsShownVoice(!isShownVoice)
    }
    const handlerShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    return (
        <div className="wrapperBox">
            <ErrorSnackbar/>
            <div className="boxMax">
                <h2 className="title">It-incubator</h2>
                <h3 className="subtitle">Sign Up</h3>
                <form onSubmit={formik.handleSubmit}>
                    <label className={'inputLabel'}>
                        Email
                        <SuperInput className='input' {...formik.getFieldProps('email')}
                                    type='text'/>
                        {formik.touched.email && formik.errors.email
                            ? (<div className={style.error}>{formik.errors.email}</div>)
                            : null
                        }
                    </label>
                    <label className={'inputLabel'}>
                        Password
                        <SuperInputPassword className={'input'}
                                            type={isShowPassword ? 'text' : 'password'}
                                            {...formik.getFieldProps('password')}
                        />
                        <img className='btnShow' onClick={onHandlerShow} src={!isShownVoice ? openShow : closeShow}
                             alt={'open'}/>
                        {formik.touched.password && formik.errors.password
                            ? <div className={style.error}>{formik.errors.password}</div>
                            : null
                        }
                    </label>
                    <div className={style.buttons}>
                        <NavLink to={PATH.LOGIN} className={style.cancel}>
                            Cancel
                        </NavLink>
                        <button disabled={disable} className={style.btnRegister}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
})

