import React, {ChangeEvent, memo, useState} from 'react';
import style from './login.module.css'
import {useDispatch} from "react-redux";
import {Navigate, NavLink} from "react-router-dom";
import {requestLoginTC} from "../../../bll/reducers/sign_in-reducer";
import {SuperButton} from "../../common/SuperButton/SuperButton";
import {SuperCheckbox, SuperInput, SuperInputPassword} from "../../common/SuperInput/SuperInput";
import {ErrorSnackbar} from "../../error/Error";
import {useAppSelector} from "../../common/hook/hook";
import {selectAppInitialized} from "../../../bll/selectors";
import {useFormik} from "formik";
import {selectSignInisLogin} from "../../../bll/selectors";

type propsType = {
    theme?: string
}
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = memo(() => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const isLogin = useAppSelector(selectSignInisLogin)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
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
            return errors;
        },
        onSubmit: values => {
            dispatch(requestLoginTC(values))
            formik.resetForm()
        },
    })


    const dispatch = useDispatch()
    // const [email, setEmail] = useState<string>('maxcardbogdan@gmail.com')
    // const [password, setPassword] = useState<string>('Stupid23Stupid')
    // const [rememberMe, setRememberMe] = useState<boolean>(false)
    // const isLoginHandler = () => {
    //     dispatch(requestLoginTC({email, password, rememberMe}))
    // }


    //onChange
    // const onChangeHandlerEmail = (e: ChangeEvent<HTMLInputElement>) => {
    //     setEmail(e.currentTarget.value);
    // };
    // const onChangeHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => {
    //     setPassword(e.currentTarget.value);
    // };
    // const onChangeHandlerChecked = (e: ChangeEvent<HTMLInputElement>) => {
    //     setRememberMe(e.currentTarget.checked);
    // };

    if (isLogin) {
        return <Navigate to='/profile'/>
    }
    const handlerShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className={`wrapperBox`}>
            <ErrorSnackbar/>
            <div className="boxMax">
                <h2 className="title">It-incubator</h2>
                <h3 className="subtitle">Sign In</h3>
                <form onSubmit={formik.handleSubmit}>
                    <label className="inputLabel">
                        Email
                        <SuperInput
                            className='input'
                            {...formik.getFieldProps('email')}
                            type='text'/>
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}

                    </label>
                    <label className="inputLabel">
                        Password
                        <SuperInputPassword className={'input'}
                                            handlerShowPassword={handlerShowPassword}
                                            type={showPassword ? 'text' : 'password'}
                                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}

                    </label>
                    <label className="inputLabel inputLabelFlex">
                        Remember Me
                        <SuperCheckbox
                            id="rememberMe"
                            type="rememberMe"
                            {...formik.getFieldProps('rememberMe')}
                        />
                        {/*<SuperInput type={'checkbox'} {...formik.getFieldProps('rememberMe')} className='inputCheckbox'*/}
                        {/*            checked={rememberMe}/>*/}
                    </label>

                    <div className={style.wrapperLink}>
                        <NavLink to={'/recovery-password'} className={style.forgotLink}>
                            Forgot Password
                        </NavLink>
                    </div>
                    <button className={`${style.btn} btnBlue`}>singIn</button>
                    {/*<SuperButton name={'Login'} onClick={isLoginHandler} className={`${style.btn} btnBlue`}/>*/}
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


