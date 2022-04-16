import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addCardsTC, CardsType, getCardsTC} from "../../bll/reducers/cards-reducer";
import {AppRootStateType} from "../../bll/store";
import {NavLink, useParams} from "react-router-dom";
import {Card} from "./Card";
import redirectIcons from '../assets/images/icons/leftCards.svg'
import style from './cards.module.css'
import {SuperInput} from "../common/SuperInput/SuperInput";

export const Cards = () => {
    const dispatch = useDispatch()
    const {packId} = useParams()


    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [dispatch])

    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)
    // const packUserId = useSelector<AppRootStateType, string>(state => state.cards.cards.)
    // console.log(packUserId)
    // more_id
    const addCardsHandler = () => {
        dispatch(addCardsTC(packId))
    }
    return (
        <div className='container'>
            <div className={style.cardsWrapper}>
                <div className={style.cardsWrapLink}>
                    <NavLink to={'/packs_list'}>
                        <img src={redirectIcons} alt="redirectIcons"/>
                    </NavLink>
                    <h3 className={style.cardsTitle}>Pack Name</h3>
                </div>
                <SuperInput placeholder={'Search...'} type='text' className={style.cardsInput}/>


                <ul className={style.cardsList}>
                    <li className={style.cardsItem}>Question</li>
                    <li className={style.cardsItem}>Answer</li>
                    <li className={style.cardsItem}>Last Updated</li>
                    <li className={style.cardsItem}>Grade</li>
                </ul>
                <button onClick={addCardsHandler}>Add</button>
                {cards.map(el => {
                    return (
                        <div key={el._id}>
                            <Card
                                question={el.question} answer={el.answer}
                                updated={el.updated} packId={packId}
                                _id={el._id} packUserId={el.user_id} more_id={el.more_id}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

