import React from 'react';
import style from './learn.module.css'
import {NavLink} from "react-router-dom";

export const Learn = () => {
    return (
        <div className={style.body}>
            <div className={style.box}>
                <div className={style.learnWrap}>
                    <h3 className={style.name}>Learn “Pack Name”</h3>
                    <p className={style.question}><span className={style.questionSpan}>Question:</span> “How "This"
                        works in JavaScript?”</p>
                </div>
                <div className={style.wrapperBtn}>
                    <NavLink className={'grayBtn'} to={'/packs_list'}>Close</NavLink>
                    <NavLink className={style.btnBlue}  to={'/packs_list/link/answer'}>Show answer</NavLink>
                </div>
            </div>
        </div>
    );
};

