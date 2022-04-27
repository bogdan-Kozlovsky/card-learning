import React, {ChangeEvent, memo} from 'react';
import {NavLink} from "react-router-dom";
import {Card} from "./card/Card";
import redirectIcons from '../assets/images/icons/leftCards.svg'
import style from './cards.module.css'
import {Paginator} from "../common/Paginator/Paginator";
import {ErrorSnackbar} from "../error/Error";
import {AddUpdateModal} from "../common/hook/AddUpdateModal";
import {useAppSelector} from "../common/hook/hook";
import {selectCardsCards, selectCardsPackUserId, selectProfileProfileId} from "../../bll/selectors";

type propsType = {
    handlerNewCard: () => void
    showModal: () => void
    overlay: boolean
    title: string
    packId: string | undefined
    cardsTotalCount: number
    totalPages: number
    setOverlay: (overlay: boolean) => void
    getNewNameCardChange: (e: ChangeEvent<HTMLInputElement>) => void
    handlePageChange: (e: { selected: number }) => void
}
export const Cards = memo((props: propsType) => {
    const {
        handlerNewCard,
        overlay,
        setOverlay,
        title,
        getNewNameCardChange,
        showModal,
        cardsTotalCount,
        packId,
        totalPages,
        handlePageChange,
    } = props

    const cards = useAppSelector(selectCardsCards)
    const myUserId = useAppSelector(selectProfileProfileId)
    const packUserId = useAppSelector(selectCardsPackUserId)
    const fixLengthText = (text: any) => text && (text)?.length >= 10 ? `${text.substr(0, 10)}...` : text

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
                                updateNameChange={getNewNameCardChange}
                                values={'add card'}
                />
                {myUserId === packUserId
                    && <button className={`btnBlue ${style.btn}`} onClick={showModal}>Add Card</button>}

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
                                question={fixLengthText(el.question)}
                                answer={fixLengthText(el.answer)}
                                updated={el.updated} packId={packId}
                                _id={el._id} more_id={el.more_id}
                                myUserId={myUserId}
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

