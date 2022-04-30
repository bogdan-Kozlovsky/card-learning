import React, {memo, useEffect, useState} from 'react';
import style from './learn.module.css'
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {CardsType, getCardsTC} from "../../bll/reducers/cards-reducer";
import {useDispatch} from "react-redux";
import {LearnAnswer} from "./LearnAnswer";
import {useAppSelector} from "../common/hook/hook";
import {selectCardsCards, selectPacksCardsPacks, selectSignInisLogin} from "../../bll/selectors";
import {PATH} from "../enums/paths";

export const Learn = memo(() => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const packs = useAppSelector(selectPacksCardsPacks)
    const cards = useAppSelector(selectCardsCards)
    const isLogin = useAppSelector(selectSignInisLogin)
    const dispatch = useDispatch();
    const {learnId} = useParams();
    const [state, setState] = useState<CardsType | null>(null)

    const a = () => {
        const learnData = getCard(cards);
        setState(learnData)
    }
    useEffect(() => {
        // if (!showAnswer) {
        dispatch(getCardsTC(learnId))
        // }
    }, [])

    useEffect(() => {
        a()
    }, [cards])


    const pack = packs.find((p) => p._id === state?.cardsPack_id)

    const navigate = useNavigate()
    if (!isLogin) {
        navigate(`${PATH.LOGIN}`)
    }


    const getCard = (cards: CardsType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
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
                <>
                    {
                        showAnswer
                            ? <div>
                                <LearnAnswer question={state?.question} answer={state?.answer} name={pack?.name}
                                             learn_id={state?._id || ''} closeAnswer={closeAnswer} a={a}
                                />
                            </div>
                            : <div className={style.bodyWrap}>
                                <div className={style.learnWrap}>
                                    <h3 className={style.name}>{pack?.name}</h3>
                                    <p className={style.question}><span
                                        className={style.questionSpan}>Question:</span> {state?.question}</p>
                                </div>
                                <div className={style.wrapperBtn}>
                                    <NavLink className={'grayBtn'} to={'/packs_list'}>Close</NavLink>
                                    <button className={style.btnBlue} onClick={showsAnswer}>Show answer</button>
                                </div>
                            </div>
                    }
                </>
            </div>
        </div>
    );
})

