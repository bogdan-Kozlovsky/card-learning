import React, { ChangeEvent, memo, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import { forgotPasswordTC } from '../../../bll/middlewares/auth/forgotPasswordTC';
import { selectAuthForgotValue } from '../../../bll/selectors';
import { useAppSelector } from '../../common/hook/hook';
import { SuperButton } from '../../common/SuperButton/SuperButton';
import { SuperInput } from '../../common/SuperInput/SuperInput';
import { PATH } from '../../enums/paths';
import { ErrorSnackbar } from '../../error/Error';

import style from './passwordRecovery.module.css';

export const PasswordRecovery = memo(() => {
  const dispatch = useDispatch();

  // selector
  const forgotValue = useAppSelector(selectAuthForgotValue);

  const [email, setEmail] = useState<string>('maxcardbogdan@gmail.com');

  // send an email to reset your password
  const data = {
    email,
    from: 'test-front-admin <ai73a@yandex.by>',
    message: `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href="https://bogdan-Kozlovsky.github.io/card-learning/#/entering-new-password/$token$">link</a>
        </div>`,
  };

  // callback
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const onClickHandler = () => {
    dispatch(forgotPasswordTC(data));
  };

  if (forgotValue) {
    return <Navigate to={PATH.EMAIL_PASSWORD} />;
  }

  return (
    <div className="wrapperBox">
      <ErrorSnackbar />
      <div className="boxMax">
        <h2 className="title">It-incubator</h2>
        <h3 className="subtitle">Forgot your password?</h3>
        <label className="inputLabel">
          Email
          <SuperInput
            className="input"
            value={email}
            onChange={onChangeHandler}
            type="text"
          />
        </label>
        <p className="description">
          Enter your email address and we will send you further instructions{' '}
        </p>
        <SuperButton
          name="Send Instructions"
          onClick={onClickHandler}
          className={`btnBlue ${style.btn}`}
        />
        <div className="wrapperLinkCenter" />
        <div className="wrapperLinkCenter">
          <NavLink to={PATH.LOGIN} className={style.forgotLink}>
            Try login in
          </NavLink>
        </div>
      </div>
    </div>
  );
});
