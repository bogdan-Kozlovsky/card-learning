import React, {ChangeEvent, memo, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {addCardsTC, getCardsTC, setCardsCurrentPageAC} from "../../bll/reducers/cards-reducer";
import {NavLink, useParams} from "react-router-dom";
import {Card} from "./card/Card";
import redirectIcons from '../assets/images/icons/leftCards.svg'
import style from './cards.module.css'
import {Paginator} from "../common/Paginator/Paginator";
import {SuperModal} from "../common/SuperModal/SuperModal";
import {ErrorSnackbar} from "../error/Error";
import {
    selectCardsCards,
    selectCardsCardsCardsTotalCount,
    selectCardsCardsParamsPageCount,
    selectCardsCardsTotalCount,
    selectProfileProfileId
} from "../../bll/selectors";
import {useAppSelector} from "../common/hook/hook";
import {AddUpdateModal} from "../common/hook/AddUpdateModal";

export const Cards = memo(() => {
    const cards = useAppSelector(selectCardsCards)
    const cardsTotalCount = useAppSelector(selectCardsCardsTotalCount)
    const ourUserId = useAppSelector(selectProfileProfileId)
    const {pageCount} = useAppSelector(selectCardsCardsParamsPageCount)
    const cardsTotalCountNum = useAppSelector(selectCardsCardsCardsTotalCount)

    const dispatch = useDispatch()
    const {packId} = useParams()


    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [])

    const fixLengthText = (text: any) => text && (text)?.length >= 10 ? `${text.substr(0, 10)}...` : text

    //pagination
    const totalPages = Math.ceil(cardsTotalCountNum / pageCount)
    const handlePageChange = (e: { selected: number }) => {
        const selectedPage = e.selected + 1;
        dispatch(setCardsCurrentPageAC(selectedPage))
        dispatch(getCardsTC(packId))
    };


    //add show modal
    // все относить к добавлению карточки
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
// все относить к добавлению карточки

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
                <AddUpdateModal handlerUpdate={handlerNewCard}
                                overlayUpdate={overlay}
                                setOverlayUpdate={setOverlay}
                                updateName={title}
                                updateNameChange={getNewNameCardChange}/>
                <button className={`btnBlue ${style.btn}`} onClick={showModal}>Add Card</button>

                {!!cardsTotalCount ?
                    <>
                        <ul className={style.cardsList}>
                            <li className={style.cardsItem}>Question</li>
                            <li className={style.cardsItem}>Answer</li>
                            <li className={style.cardsItem}>Last Updated</li>
                            <li className={style.cardsItem}>Rating</li>
                        </ul>
                    </>
                    : <h1 className={style.title}>No card</h1>
                }


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
                {!!cardsTotalCount
                    && cardsTotalCount > 7
                    && <Paginator totalPages={totalPages} handlePageChange={handlePageChange}/>
                }
            </div>
        </div>
    );
})

