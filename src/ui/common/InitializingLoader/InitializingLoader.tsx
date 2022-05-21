import React from 'react';

import preloader from '../../assets/images/icons/preloader.svg';

import s from './Initializing.module.css';

export const InitializingLoader = () => (
  <div className={s.loader}>
    <img className={s.preloader} src={preloader} alt="preloader" />
  </div>
);
