import React, { memo, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { CardsType, getCardsTC } from '../../bll/reducers/cards-reducer';
import {
  selectCardsCards,
  selectPacksCardsPacks,
  selectSignInisLogin,
} from '../../bll/selectors';
import { useAppSelector } from '../common/hook/hook';
import { PATH } from '../enums/paths';

import style from './learn.module.css';
import { LearnAnswer } from './LearnAnswer';

export const Learn = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { learnId } = useParams();

  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [state, setState] = useState<CardsType | null>(null);

  // selector
  const packs = useAppSelector(selectPacksCardsPacks);
  const cards = useAppSelector(selectCardsCards);
  const isLogin = useAppSelector(selectSignInisLogin);

  const getCardHandler = () => {
    const learnData = getCard(cards);
    setState(learnData);
  };
  useEffect(() => {
    dispatch(getCardsTC(learnId));
  }, []);

  useEffect(() => {
    getCardHandler();
  }, [cards]);

  const pack = packs.find(p => p._id === state?.cardsPack_id);

  // random card
  const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce(
      (acc: { sum: number; id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
        return { sum: newSum, id: newSum < rand ? i : acc.id };
      },
      { sum: 0, id: -1 },
    );
    return cards[res.id + 1];
  };
  const showsAnswer = () => {
    setShowAnswer(true);
  };
  const closeAnswer = () => {
    setShowAnswer(false);
  };

  if (!isLogin) {
    navigate(`${PATH.LOGIN}`);
  }
  return (
    <div className={style.body}>
      <div className={style.box}>
        {showAnswer ? (
          <div>
            <LearnAnswer
              question={state?.question}
              answer={state?.answer}
              name={pack?.name}
              learnId={state?._id || ''}
              closeAnswer={closeAnswer}
              getCardHandler={getCardHandler}
            />
          </div>
        ) : (
          <div className={style.bodyWrap}>
            <div className={style.learnWrap}>
              <h3 className={style.name}>{pack?.name}</h3>
              <p className={style.question}>
                <span className={style.questionSpan}>Question:</span> {state?.question}
              </p>
            </div>
            <div className={style.wrapperBtn}>
              <NavLink className="grayBtn" to={PATH.PACKS}>
                Close
              </NavLink>
              <button className={style.btnBlue} onClick={showsAnswer}>
                Show answer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
