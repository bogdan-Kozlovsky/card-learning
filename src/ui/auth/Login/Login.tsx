import React, { memo, useState } from 'react';

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import { requestLoginTC } from '../../../bll/reducers/sign_in-reducer';
import { selectSignInisLogin } from '../../../bll/selectors';
import closeShow from '../../assets/images/closeShow.svg';
import openShow from '../../assets/images/openShow.svg';
import { checkValidation } from '../../common/checkValidation';
import { useAppSelector } from '../../common/hook/hook';
import { SuperCheckbox } from '../../common/SuperInput/SuperCheckbox';
import { SuperInput } from '../../common/SuperInput/SuperInput';
import { SuperInputPassword } from '../../common/SuperInput/SuperInputPassword';
import { PATH } from '../../enums/paths';
import { ErrorSnackbar } from '../../error/Error';

import style from './login.module.css';

export const Login = memo(() => {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  // selector
  const isLogin = useAppSelector(selectSignInisLogin);

  // @ts-ignore
  const formik = useFormik({
    initialValues: {
      email: 'maxcardbogdan@gmail.com',
      password: 'Stupid23Stupid',
      rememberMe: true,
    },
    validate: values => checkValidation(formik, values, setDisable),
    onSubmit: data => {
      dispatch(requestLoginTC(data));
      setDisable(true);
      formik.resetForm();
    },
  });

  // open voice
  const handlerShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const [isShownVoice, setIsShownVoice] = useState<boolean>(false);
  const onHandlerShow = () => {
    handlerShowPassword();
    setIsShownVoice(!isShownVoice);
  };

  if (isLogin) {
    return <Navigate to={PATH.PROFILE} />;
  }

  return (
    <div className="wrapperBox">
      <ErrorSnackbar />
      <div className="boxMax">
        <h2 className="title">It-incubator</h2>
        <h3 className="subtitle">Sign In</h3>
        <form onSubmit={formik.handleSubmit}>
          <label className="inputLabel">
            Email
            <SuperInput
              className="input"
              {...formik.getFieldProps('email')}
              type="text"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={style.error}>{formik.errors.email}</div>
            ) : null}
          </label>
          <label className="inputLabel">
            Password
            <SuperInputPassword
              className="input"
              type={isShowPassword ? 'text' : 'password'}
              {...formik.getFieldProps('password')}
            />
            <img
              className="btnShow"
              onClick={onHandlerShow}
              src={!isShownVoice ? openShow : closeShow}
              alt="open"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={style.error}>{formik.errors.password}</div>
            ) : null}
          </label>
          <label className="inputLabel inputLabelFlex">
            Remember Me
            <SuperCheckbox
              id="rememberMe"
              type="rememberMe"
              {...formik.getFieldProps('rememberMe')}
            />
          </label>

          <div className={style.wrapperLink}>
            <NavLink to={PATH.PASSWORD_RECOVERY} className={style.forgotLink}>
              Forgot Password
            </NavLink>
          </div>
          <button disabled={disable} className={`${style.btn} btnBlue`}>
            Login
          </button>
          <div className="wrapperLinkCenter">
            <NavLink to={PATH.REGISTRATION} className={style.forgotLink}>
              Sign Up
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
});
