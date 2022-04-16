import React from 'react';
import style from "./cards.module.css";
import deleteIcon from "../assets/images/deleteIcon.svg";
import updatePack from "../assets/images/updatePackName.svg";
import {deleteCardTC, updateCardTC} from "../../bll/reducers/cards-reducer";
import {useDispatch} from "react-redux";

type propsType = {
    question: string
    answer: string
    updated: Date
    packId: string | undefined
    _id: string
    packUserId: string
    more_id: any
}

export const Card = (props: propsType) => {
    const {
        question,
        answer,
        updated,
        packId,
        _id,
        packUserId,
        more_id,
    } = props

    console.log(packUserId)
    console.log(more_id)
    const dispatch = useDispatch()

    const deleteCardHandler = (_id: string) => {
        dispatch(deleteCardTC(packId, _id))
    }

    const updateCardHandler = (_id: string) => {
        dispatch(updateCardTC(packId, _id))
    }
    return (
        <ul>
            <li>{question}</li>
            <li>{answer}</li>
            <li>{updated}</li>
            <li>
                {packUserId === more_id
                    &&
                    <>
                        <img className={style.cardImg} onClick={() => deleteCardHandler(_id)} src={deleteIcon}
                             alt={'deleteIcon'}/>
                        <img onClick={() => updateCardHandler(_id)} src={updatePack} alt={'updatePack'}/>
                    </>
                }

            </li>
        </ul>
    );
};

