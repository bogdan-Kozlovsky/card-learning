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
import {SuperModal} from "../common/SuperModal/SuperModal";
import {ErrorSnackbar} from "../error/Error";

export const Cards = () => {
    const dispatch = useDispatch()
    const {packId} = useParams()


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
    const getNewNameCardChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handlerNewCard = () => {
        dispatch(addCardsTC(packId, title))
        closeModal()
    }

    // const getCard = (cards: CardsType[]) => {
    //     const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    //     const rand = Math.random() * sum;
    //     const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
    //             const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
    //             return {sum: newSum, id: newSum < rand ? i : acc.id}
    //         }
    //         , {sum: 0, id: -1});
    //     console.log(cards[res.id + 1])
    //     return cards[res.id + 1];
    // }
    //
    // const a = () => {
    //     dispatch(getCardsTC(getCard(cards).cardsPack_id))
    // }


    return (
        <div className='container'>
            <ErrorSnackbar/>
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
                    <SuperModal closeModal={closeModal} valueTitle={title} titleName={'Add new card'}>
                        <input onChange={getNewNameCardChange} className='inputModal' placeholder={title}
                               value={title}/>
                        <button onClick={handlerNewCard} className='successBtn'>Save</button>
                    </SuperModal>
                </div>

                <button onClick={showModal}>Add</button>
                {cards.map(el => {
                    return (
                        <div key={el._id}>
                            <Card
                                question={fixLengthText(el.question)} answer={fixLengthText(el.answer)}
                                updated={el.updated} packId={packId}
                                _id={el._id} more_id={el.more_id} ourUserId={ourUserId}
                                grade={el.grade}
                            />
                        </div>
                    )
                })}
                <Paginator totalPages={totalPages} handlePageChange={handlePageChange}/>
            </div>
        </div>
    );
};

