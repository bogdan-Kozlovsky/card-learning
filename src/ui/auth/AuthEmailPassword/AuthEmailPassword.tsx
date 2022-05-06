import React from 'react';

import iconDecor from '../../assets/images/Group 281.svg';
import { ErrorSnackbar } from '../../error/Error';

import style from './authEmailPassword.module.css';

export const AuthEmailPassword = React.memo(() => (
  <div className="wrapperBox">
    <ErrorSnackbar />
    <div className="boxMin">
      <h2 className="title">It-incubator</h2>
      <img className={style.iconDecor} src={iconDecor} alt="icon" />
      <h3 className="subtitle">Check Email</h3>
      <p className={style.description}>
        We’ve sent an Email with instructions to example@mail.com
      </p>
    </div>
  </div>
));
