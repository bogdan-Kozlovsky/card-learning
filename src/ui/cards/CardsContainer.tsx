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
import {Cards} from "./Cards";

export const CardsContainer = memo(() => {
    const cardsTotalCount = useAppSelector(selectCardsCardsTotalCount)
    const {pageCount} = useAppSelector(selectCardsCardsParamsPageCount)
    const cardsTotalCountNum = useAppSelector(selectCardsCardsCardsTotalCount)

    const dispatch = useDispatch()
    const {packId} = useParams()


    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [])


    //pagination
    const totalPages = Math.ceil(cardsTotalCountNum / pageCount)
    const handlePageChange = (e: { selected: number }) => {
        const selectedPage = e.selected + 1;
        dispatch(setCardsCurrentPageAC(selectedPage))
        dispatch(getCardsTC(packId))
    };

    //add show modal
    const [overlay, setOverlay] = useState<boolean>(false);
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

    return (
        <>
            <Cards
                handlerNewCard={handlerNewCard}
                overlay={overlay}
                setOverlay={setOverlay}
                title={title}
                getNewNameCardChange={getNewNameCardChange}
                showModal={showModal}
                cardsTotalCount={cardsTotalCount}
                packId={packId}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </>
    );
})

