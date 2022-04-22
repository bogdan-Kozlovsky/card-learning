import React from 'react';
import style from './learn.module.css'
import {NavLink} from "react-router-dom";

export const LearnAnswer = () => {
    return (
        <div className={style.body}>
            <div className={style.answerBody}>
                <div className={style.flexBox}>
                    <div className={style.learnWrap}>
                        <h3 className={style.name}>Learn “Pack Name”</h3>
                        <div className={style.descriptionBox}>
                            <p className={style.question}><span className={style.questionSpan}>Question:</span> “How
                                "This"
                                works in JavaScript?”
                            </p>
                            <p className={style.question}><span className={style.questionSpan}>Answer:</span> “How
                                "This"
                                works in JavaScript?”
                            </p>
                        </div>

                        <ul>
                            <li className={style.answerItem}>
                                <span className={style.answerItemSpan}>Rate yourself:</span>
                            </li>
                            <AnswerItem name={'Did not know, 1/5'} value={1}/>
                            <AnswerItem name={'Forgot, 2/5'} value={2}/>
                            <AnswerItem name={'A lot of thought, 3/5'} value={3}/>
                            <AnswerItem name={'Confused, 4/5'} value={4}/>
                            <AnswerItem name={'Knew the answer, 5/5'} value={5}/>
                        </ul>
                    </div>

                    <div className={style.wrapperBtn}>
                        <NavLink className={'grayBtn'} to={'/packs_list/link'}>Close</NavLink>
                        <NavLink className={style.btnBlue} to={''}>Show answer</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

type AnswerItemType = {
    name: string
    value: number
}
const AnswerItem = ({name, value}: AnswerItemType) => {
    return (
        <li className={style.answerItem}>
            <label>
                <input className={style.answerInput} type="radio" name={'radio'} value={value}/>
                <span>{name}</span>
            </label>
        </li>
    )
}

