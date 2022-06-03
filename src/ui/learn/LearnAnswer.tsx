import React, { ChangeEvent, memo, useState } from 'react';

import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { gradeTC } from '../../bll/middlewares/cards/gradeTC';
import { selectSignInisLogin } from '../../bll/selectors';
import { useAppSelector } from '../common/hook/hook';
import { PATH } from '../enums/paths';

import style from './learn.module.css';

type LearnAnswerPropsType = {
  learnId: string;
  closeAnswer: () => void;
  name: string | undefined;
  question: string | undefined;
  answer: string | undefined;
  getCardHandler: any;
};

type AnswerItemType = {
  name: string;
  value: number;
  setValueInput: (value: string) => void;
};
const AnswerItem = memo((props: AnswerItemType) => {
  const { name, value, setValueInput } = props;
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  return (
    <li className={style.answerItem}>
      <label>
        <input
          className={style.answerInput}
          type="radio"
          name="radio"
          value={value}
          onChange={onChangeHandler}
        />
        <span>{name}</span>
      </label>
    </li>
  );
});

export const LearnAnswer = memo((props: LearnAnswerPropsType) => {
  const { learnId, name, question, answer, closeAnswer } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // selector
  const isLogin = useAppSelector(selectSignInisLogin);
  const [valueInput, setValueInput] = useState<string>('');

  const nextCard = () => {
    dispatch(gradeTC(+valueInput, learnId));
    props.getCardHandler();
    closeAnswer();
  };

  if (!isLogin) {
    navigate(`${PATH.LOGIN}`);
  }

  return (
    <div className={style.learnAnswerBody}>
      <div className={style.answerBody}>
        <div className={style.flexBox}>
          <div className={style.learnWrap}>
            <h3 className={style.name}>Learn {name}</h3>
            <div className={style.descriptionBox}>
              <p className={style.question}>
                <span className={style.questionSpan}>Question:</span>
                {question}
              </p>
              <p className={style.question}>
                <span className={style.questionSpan}>Answer:</span> {answer}
              </p>
            </div>
            <ul>
              <li className={style.answerItem}>
                <span className={style.answerItemSpan}>Rate yourself:</span>
              </li>
              <AnswerItem
                name="Did not know, 1/5"
                value={1}
                setValueInput={setValueInput}
              />
              <AnswerItem name="Forgot, 2/5" value={2} setValueInput={setValueInput} />
              <AnswerItem
                name="A lot of thought, 3/5"
                value={3}
                setValueInput={setValueInput}
              />
              <AnswerItem name="Confused, 4/5" value={4} setValueInput={setValueInput} />
              <AnswerItem
                name="Knew the answer, 5/5"
                value={5}
                setValueInput={setValueInput}
              />
            </ul>
          </div>

          <div className={style.wrapperBtn}>
            <NavLink className="grayBtn" to={PATH.PACKS}>
              Close
            </NavLink>
            <button className={style.btnBlue} onClick={nextCard}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
