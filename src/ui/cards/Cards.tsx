import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CardsType, getCardsTC} from "../../bll/reducers/cards-reducer";
import {AppRootStateType} from "../../bll/store";
import {useParams} from "react-router-dom";

export const Cards = () => {
    const dispatch = useDispatch()
    const {packId} = useParams()
    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [])

    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)
    console.log(Array.isArray(cards))
    return (
        <div>
            {cards.map(el => {
                return (
                    <div>
                        <div>{el.created}</div>
                        <div>{el.answer}</div>
                    </div>

                )
            })}
        </div>
    );
};

