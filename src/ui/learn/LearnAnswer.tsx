import React, {ChangeEvent, useState} from 'react';
import style from './learn.module.css'
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {gradeTC} from "../../bll/reducers/cards-reducer";

type LearnAnswerPropsType = {
    learn_id: string
    closeAnswer: () => void
    name: string | undefined
    question: string | undefined
    answer: string | undefined
}

export const LearnAnswer = (props: LearnAnswerPropsType) => {
    const {learn_id, name, question, answer} = props
    const dispatch = useDispatch()
    const [valueInput, setValueInput] = useState<string>('')

    const nextCard = () => {
        dispatch(gradeTC(+valueInput, learn_id))
        props.closeAnswer()
    }

    return (
        <div className={style.body}>
            <div className={style.answerBody}>
                <div className={style.flexBox}>
                    <div className={style.learnWrap}>
                        <h3 className={style.name}>Learn {name}</h3>
                        <div className={style.descriptionBox}>
                            <p className={style.question}><span
                                className={style.questionSpan}>Question:</span>{question}
                            </p>
                            <p className={style.question}><span className={style.questionSpan}>Answer:</span> {answer}
                            </p>
                        </div>

                        <ul>
                            <li className={style.answerItem}>
                                <span className={style.answerItemSpan}>Rate yourself:</span>
                            </li>
                            <AnswerItem name={'Did not know, 1/5'} value={1} setValueInput={setValueInput}/>
                            <AnswerItem name={'Forgot, 2/5'} value={2} setValueInput={setValueInput}/>
                            <AnswerItem name={'A lot of thought, 3/5'} value={3} setValueInput={setValueInput}/>
                            <AnswerItem name={'Confused, 4/5'} value={4} setValueInput={setValueInput}/>
                            <AnswerItem name={'Knew the answer, 5/5'} value={5} setValueInput={setValueInput}/>
                        </ul>
                    </div>

                    <div className={style.wrapperBtn}>
                        <NavLink className={'grayBtn'} to={'/packs_list/link'}>Close</NavLink>
                        <button className={style.btnBlue} onClick={nextCard}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

type AnswerItemType = {
    name: string
    value: number
    setValueInput: (value: string) => void
}
const AnswerItem = ({name, value, setValueInput}: AnswerItemType) => {
// const valueInput
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value)
    }

    return (
        <li className={style.answerItem}>
            <label>
                <input className={style.answerInput} type="radio" name={'radio'} value={value}
                       onChange={onChangeHandler}/>
                <span>{name}</span>
            </label>
        </li>
    )
}

