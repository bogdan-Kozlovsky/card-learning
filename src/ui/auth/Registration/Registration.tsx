import React, {ChangeEvent, memo, useState} from 'react';
import style from './registration.module.css'
import {useDispatch} from "react-redux";
import {Navigate, NavLink} from 'react-router-dom';
import {requestRegistrationTC} from "../../../bll/reducers/sign_up-reducer";
import {ErrorSnackbar} from "../../error/Error";
import {selectSignUpIsRegistration} from "../../../bll/selectors";
import {useAppSelector} from "../../common/hook/hook";
import {SuperInputPassword} from "../../common/SuperInput/SuperInputPassword";
import {useFormik} from "formik";
import {requestLoginTC} from "../../../bll/reducers/sign_in-reducer";
import {SuperInput} from "../../common/SuperInput/SuperInput";
import openShow from "../../assets/images/openShow.svg";
import closeShow from "../../assets/images/closeShow.svg";

type  FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Registration = memo(() => {
    const isRegistration = useAppSelector(selectSignUpIsRegistration)

    const dispatch = useDispatch()
    const [email, setEmail] = useState<string>('maxcardbogdan@gmail.com');
    const [password, setPassword] = useState<string>('Stupid23Stupid');
    const [disable, setDisable] = useState<boolean>(false)
    const [isShownVoice, setIsShownVoice] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)


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
           dispatch(requestRegistrationTC(data))
            setDisable(true)
            formik.resetForm()
        },
    })

    if (isRegistration) {
        return <Navigate to='/login'/>
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
                    <label className={style.inputLabel}>
                        Email
                        <SuperInput className='input' {...formik.getFieldProps('email')}
                                    type='text'/>
                        {formik.touched.email && formik.errors.email
                            ? (<div className={style.error}>{formik.errors.email}</div>)
                            : null
                        }
                    </label>
                    <label className={style.inputLabel}>
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
                    <NavLink to={'/login'} className={style.cancel}>
                        Cancel
                    </NavLink>
                    <button
                        onClick={sendRegistrationRequest}
                        className={style.btnRegister}
                    >Register
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
})

