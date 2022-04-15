import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addCardsTC, CardsType, deleteCardTC, getCardsTC, updateCardTC} from "../../bll/reducers/cards-reducer";
import {AppRootStateType} from "../../bll/store";
import {useParams} from "react-router-dom";

export const Cards = () => {
    const dispatch = useDispatch()
    const {packId} = useParams()


    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [])

    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)

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
        <div>]
            <button onClick={addCardsHandler}>Add</button>
            {cards.map(el => {
                return (
                    <div>

                        <div>{el.created}</div>
                        <div>{el.question}</div>
                        <button onClick={() => deleteCardHandler(el._id)}>delete</button>
                        <button onClick={() => updateCardHandler(el._id)}>edit</button>
                    </div>

                )
            })}
        </div>
    );
};

