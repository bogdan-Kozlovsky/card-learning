import React, { ChangeEvent, memo, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { newPasswordTC } from '../../../bll/middlewares/auth/newPasswordTC';
import { selectAuthNewPasswordValue } from '../../../bll/selectors/auth';
import { useAppSelector } from '../../common/hook/hook';
import { SuperButton } from '../../common/SuperButton/SuperButton';
import { SuperInputPassword } from '../../common/SuperInput/SuperInputPassword';
import { PATH } from '../../enums/paths';
import { ErrorSnackbar } from '../../error/Error';

import style from './newPassword.module.css';

export const NewPassword = memo(() => {
  const dispatch = useDispatch();

  const { token } = useParams();

  const newPasswordValue = useAppSelector(selectAuthNewPasswordValue);

  const [password, setPassword] = useState<string>('Stupid23Stupid');

  const onChangeHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const sendData = () => {
    dispatch(newPasswordTC({ password, resetPasswordToken: token }));
  };

  if (newPasswordValue) {
    return <Navigate to={PATH.LOGIN} />;
  }
  return (
    <div className="wrapperBox">
      <ErrorSnackbar />
      <div className="boxMin">
        <h2 className="title">It-incubator</h2>
        <h3 className="subtitle">Create new password</h3>
        <label className="inputLabel">
          Password
          <SuperInputPassword
            className="input"
            value={password}
            onChange={onChangeHandlerPassword}
          />
        </label>
        <p className="description">
          {' '}
          Create new password and we will send you further instructions to email
        </p>
        <SuperButton
          name="Create new password"
          className={`btnBlue ${style.btn}`}
          onClick={sendData}
        />
      </div>
    </div>
  );
});
