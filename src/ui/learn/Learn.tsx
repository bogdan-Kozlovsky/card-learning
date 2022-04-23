import React, {useEffect, useState} from 'react';
import style from './learn.module.css'
import {NavLink, useParams} from "react-router-dom";
import {CardsType, getCardsTC} from "../../bll/reducers/cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {LearnAnswer} from "./LearnAnswer";

export const Learn = () => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)
    const dispatch = useDispatch();

    const {learnId} = useParams();

    useEffect(() => {
        dispatch(getCardsTC(learnId))
    }, [dispatch, learnId])

    const getCard = (cards: CardsType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        // console.log(cards[res.id + 1])
        return cards[res.id + 1];
    }

    const learnCards = getCard(cards);

    const showsAnswer = () => {
        setShowAnswer(true)
    }
    return (
        <div className={style.body}>
            <div className={style.box}>
                <div>
                    {
                        showAnswer
                            ? <div>
                                <LearnAnswer/>
                            </div>
                            : <div>
                                <div className={style.learnWrap}>
                                    <h3 className={style.name}>{learnCards?.question}</h3>
                                    <p className={style.question}><span
                                        className={style.questionSpan}>Question:</span> {learnCards?.question}</p>
                                </div>
                                <div className={style.wrapperBtn}>
                                    <NavLink className={'grayBtn'} to={'/packs_list'}>Close</NavLink>
                                    <button className={style.btnBlue} onClick={showsAnswer}>Show answer</button>
                                </div>
                            </div>
                    }

                </div>

            </div>
        </div>
    );
};

