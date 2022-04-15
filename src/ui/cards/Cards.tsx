import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addCardsTC, CardsType, deleteCardTC, getCardsTC, updateCardTC} from "../../bll/reducers/cards-reducer";
import {AppRootStateType} from "../../bll/store";
import {NavLink, useParams} from "react-router-dom";
import {Card} from "./Card";
import deleteIcon from '../assets/images/deleteIcon.svg'
import updatePack from '../assets/images/updatePackName.svg'
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
    // console.log(cards)
    const addCardsHandler = () => {
        dispatch(addCardsTC(packId))
    }
    const deleteCardHandler = (_id: string) => {
        dispatch(deleteCardTC(packId, _id))
    }

    const updateCardHandler = (_id: string) => {
        dispatch(updateCardTC(packId, _id))
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
                            <Card question={el.question} answer={el.answer} updated={el.updated}/>
                            <img className={style.cardsImg} onClick={() => deleteCardHandler(el._id)} src={deleteIcon}
                                 alt={'deleteIcon'}/>
                            <img onClick={() => updateCardHandler(el._id)} src={updatePack} alt={'updatePack'}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

