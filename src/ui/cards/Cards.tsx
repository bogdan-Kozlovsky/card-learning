import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addCardsTC, CardsType, getCardsTC} from "../../bll/reducers/cards-reducer";
import {AppRootStateType} from "../../bll/store";
import {NavLink, useParams} from "react-router-dom";
import {Card} from "./card/Card";
import redirectIcons from '../assets/images/icons/leftCards.svg'
import style from './cards.module.css'
import {SuperInput} from "../common/SuperInput/SuperInput";
import {Paginator} from "../common/Paginator/Paginator";
import {setCurrentPageAC} from "../../bll/reducers/packs-reducer";

export const Cards = () => {
    const dispatch = useDispatch()
    const {packId} = useParams()
    const status = useSelector<AppRootStateType, null | string>(state => state.app.status)


    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [])

    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const addCardsHandler = () => {
        dispatch(addCardsTC(packId))
    }
    const fixLengthText = (text: any) => text && (text)?.length >= 10 ? `${text.substr(0, 10)}...` : text
    // const ourUserId = useSelector<AppRootStateType, string | null>(state => state.signIn.profile._id)
    const ourUserId = useSelector<AppRootStateType, null | string>(state => state.profile.profile._id)


    //pagination
    const packPage = useSelector<AppRootStateType, number>(state => state.cards.page)
    const packTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const totalPages = Math.ceil(packTotalCount / packPage)
    const handlePageChange = (e: { selected: number }) => {
        const selectedPage = e.selected + 1;
        dispatch(setCurrentPageAC(selectedPage))
        dispatch(getCardsTC(packId))
    };
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


                {cardsTotalCount - 1 && <ul className={style.cardsList}>
                    <li className={style.cardsItem}>Question</li>
                    <li className={style.cardsItem}>Answer</li>
                    <li className={style.cardsItem}>Last Updated</li>
                    <li className={style.cardsItem}>Rating</li>
                </ul>}

                <button onClick={addCardsHandler}>Add</button>
                {cards.map(el => {
                    return (
                        <div key={el._id}>
                            <Card
                                question={fixLengthText(el.question)} answer={fixLengthText(el.answer)}
                                updated={el.updated} packId={packId}
                                _id={el._id} more_id={el.more_id} ourUserId={ourUserId}
                                rating={el.rating}
                            />
                        </div>
                    )
                })}
                <Paginator totalPages={totalPages} handlePageChange={handlePageChange}/>
            </div>
        </div>
    );
};

