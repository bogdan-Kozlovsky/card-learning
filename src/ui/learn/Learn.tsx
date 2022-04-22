import React from 'react';
import style from './learn.module.css'
import {NavLink} from "react-router-dom";
import {CardsType} from "../../bll/reducers/cards-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";

export const Learn = () => {
    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)

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

    const learnCards = getCard(cards)

    return (
        <div className={style.body}>
            <div className={style.box}>
                <div className={style.learnWrap}>
                    <h3 className={style.name}>{learnCards.answer}</h3>
                    <p className={style.question}><span
                        className={style.questionSpan}>Question:</span> {learnCards.question}</p>
                </div>
                <div className={style.wrapperBtn}>
                    <NavLink className={'grayBtn'} to={'/packs_list'}>Close</NavLink>
                    <NavLink className={style.btnBlue} to={'/packs_list/link/answer'}>Show answer</NavLink>
                </div>
            </div>
        </div>
    );
};

