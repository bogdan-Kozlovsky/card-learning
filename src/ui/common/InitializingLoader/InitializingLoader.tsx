import React from 'react';
import s from './Initializing.module.css'

export const InitializingLoader = () => {
    return (
        <div className={s.loader}>
            <div className={`${s.inner} ${s.one}`}></div>
            <div className={`${s.inner} ${s.two}`}></div>
            <div className={`${s.inner} ${s.three}`}></div>
        </div>

    )
}