import React, {memo, useState} from 'react';
import style from './login.module.css'
import {useDispatch} from "react-redux";
import {Navigate, NavLink} from "react-router-dom";
import {requestLoginTC} from "../../../bll/reducers/sign_in-reducer";
import {ErrorSnackbar} from "../../error/Error";
import {useAppSelector} from "../../common/hook/hook";
import {selectSignInisLogin} from "../../../bll/selectors";
import {useFormik} from "formik";
import {SuperInput} from "../../common/SuperInput/SuperInput";
import {SuperCheckbox} from "../../common/SuperInput/SuperCheckbox";
import {SuperInputPassword} from "../../common/SuperInput/SuperInputPassword";
import openShow from "../../assets/images/openShow.svg";
import closeShow from "../../assets/images/closeShow.svg";
import {InitializingLoader} from "../../common/InitializingLoader/InitializingLoader";

type  FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = memo(() => {
    const dispatch = useDispatch()
    const [disable, setDisable] = useState<boolean>(false)
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
    const isLogin = useAppSelector(selectSignInisLogin)

    const formik = useFormik({
        initialValues: {
            email: 'maxcardbogdan@gmail.com',
            password: 'Stupid23Stupid',
            rememberMe: true
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be more than 3 characters.';
            }

            if (formik.errors.email || formik.errors.password) {
                if (Object.keys(errors).length === 0) {
                    setDisable(false)
                } else {
                    setDisable(true)
                }
            }
            return errors;
        },
        onSubmit: data => {
            dispatch(requestLoginTC(data))
            setDisable(true)
            formik.resetForm()
        },
    })

    //open voice
    const [isShownVoice, setIsShownVoice] = useState(false);
    const onHandlerShow = () => {
        handlerShowPassword()
        setIsShownVoice(!isShownVoice)
    }
    const handlerShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    if (isLogin) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className={`wrapperBox`}>
            <ErrorSnackbar/>
            <div className="boxMax">
                <h2 className="title">It-incubator</h2>
                <h3 className="subtitle">Sign In</h3>
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
                    <label className={`inputLabel inputLabelFlex`}>
                        Remember Me
                        <SuperCheckbox
                            id="rememberMe"
                            type="rememberMe"
                            {...formik.getFieldProps('rememberMe')}
                        />
                    </label>

                    <div className={style.wrapperLink}>
                        <NavLink to={'/recovery-password'} className={style.forgotLink}>
                            Forgot Password
                        </NavLink>
                    </div>
                    <button disabled={disable} className={`${style.btn} btnBlue`}>Login</button>
                    <div className='wrapperLinkCenter'>
                        <NavLink to={'/register'} className={style.forgotLink}>
                            Sign Up
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
})


