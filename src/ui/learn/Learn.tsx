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
    const [state, setState] = useState<CardsType | null>(null)

    useEffect(() => {
        if (!showAnswer) {
            dispatch(getCardsTC(learnId))
        }
    }, [showAnswer])

    useEffect(() => {
        const learnData = getCard(cards);
        setState(learnData)
    }, [cards])

    const getCard = (cards: CardsType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        console.log(cards[res.id + 1], 'hallaaaa')
        return cards[res.id + 1];
    }

    const showsAnswer = () => {
        setShowAnswer(true)
    }
    const closeAnswer = () => {
        setShowAnswer(false)
    }
    return (
        <div className={style.body}>
            <div className={style.box}>
                <div>
                    {
                        showAnswer
                            ? <div>
                                <LearnAnswer learn_id={state?._id|| ''} closeAnswer={closeAnswer}

                                />
                            </div>
                            : <div>
                                <div className={style.learnWrap}>
                                    <h3 className={style.name}>{state?.question}</h3>
                                    <p className={style.question}><span
                                        className={style.questionSpan}>Question:</span> {state?.question}</p>
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

