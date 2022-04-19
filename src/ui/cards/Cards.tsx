import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addCardsTC,
    CardsParamsType,
    CardsType,
    getCardsTC,
    setCardsCurrentPageAC
} from "../../bll/reducers/cards-reducer";
import {AppRootStateType} from "../../bll/store";
import {NavLink, useParams} from "react-router-dom";
import {Card} from "./card/Card";
import redirectIcons from '../assets/images/icons/leftCards.svg'
import style from './cards.module.css'
import {SuperInput} from "../common/SuperInput/SuperInput";
import {Paginator} from "../common/Paginator/Paginator";
import SuperModal from "../common/SuperModal/SuperModal";

export const Cards = () => {
    const dispatch = useDispatch()
    const {packId} = useParams()
    const status = useSelector<AppRootStateType, null | string>(state => state.app.status)


    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [])

    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)

    const fixLengthText = (text: any) => text && (text)?.length >= 10 ? `${text.substr(0, 10)}...` : text
    // const ourUserId = useSelector<AppRootStateType, string | null>(state => state.signIn.profile._id)
    const ourUserId = useSelector<AppRootStateType, null | string>(state => state.profile.profile._id)


    //pagination
    const {pageCount} = useSelector<AppRootStateType, CardsParamsType>(state => state.cards.params)
    const cardsTotalCountNum = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const totalPages = Math.ceil(cardsTotalCountNum / pageCount)
    const handlePageChange = (e: { selected: number }) => {
        const selectedPage = e.selected + 1;
        dispatch(setCardsCurrentPageAC(selectedPage))
        dispatch(getCardsTC(packId))
    };


    //add show modal
    const [overlay, setOverlay] = useState(false);
    const [title, setTitle] = useState<string>('')

    const showModal = () => {
        setOverlay(true)
    }

    const closeModal = () => {
        setOverlay(false)
    }

    // get new name pack
    const getNewNameCard = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handlerNewCard = () => {
        dispatch(addCardsTC(packId, title))
        closeModal()
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


                {cardsTotalCount - 1 && <ul className={style.cardsList}>
                    <li className={style.cardsItem}>Question</li>
                    <li className={style.cardsItem}>Answer</li>
                    <li className={style.cardsItem}>Last Updated</li>
                    <li className={style.cardsItem}>Rating</li>
                </ul>}

                <div className={overlay ? `${style.overlay_shown}` : `${style.overlay_hidden}`}>
                    <SuperModal closeModal={closeModal} onClickSuperCallback={handlerNewCard}
                                getNewTitle={getNewNameCard} valueTitle={title}/>
                </div>

                <button onClick={showModal}>Add</button>
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

