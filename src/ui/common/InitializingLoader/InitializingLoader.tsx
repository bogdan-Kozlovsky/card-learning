import React from 'react';

import s from './Initializing.module.css';

export const InitializingLoader = () => (
  <div className={s.loader}>
    <div className={`${s.inner} ${s.one}`} />
    <div className={`${s.inner} ${s.two}`} />
    <div className={`${s.inner} ${s.three}`} />
  </div>
);
