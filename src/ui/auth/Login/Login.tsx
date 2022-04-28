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

type propsType = {
    theme?: string
}

export const Login = memo((props: propsType) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const {theme} = props
    const initialized = useAppSelector(selectAppInitialized)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(requestLoginTC(values))
            formik.resetForm()
        },
    })


    const dispatch = useDispatch()
    const [email, setEmail] = useState<string>('maxcardbogdan@gmail.com')
    const [password, setPassword] = useState<string>('Stupid23Stupid')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const isLoginHandler = () => {
        dispatch(requestLoginTC({email, password, rememberMe}))
    }


    //onChange
    const onChangeHandlerEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    };
    const onChangeHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    };
    const onChangeHandlerChecked = (e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked);
    };

    if (initialized) {
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
                        <SuperInput className='input' {...formik.getFieldProps('email')}
                                    type='text'/>
                    </label>
                    <label className="inputLabel">
                        Password
                        <SuperInputPassword className={'input'}
                                            handlerShowPassword={handlerShowPassword}
                                            type={showPassword ? 'text' : 'password'}
                                            {...formik.getFieldProps('password')}
                        />
                    </label>
                    <label className="inputLabel inputLabelFlex">
                        Remember Me
                        <SuperCheckbox theme={theme}
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


