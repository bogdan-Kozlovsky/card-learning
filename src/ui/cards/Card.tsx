import React from 'react';
import style from "./card.module.css";
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
    more_id: any
    ourUserId: string | null
    rating: number
}

export const Card = (props: propsType) => {
    const {
        question,
        answer,
        updated,
        packId,
        _id,
        more_id,
        ourUserId,
        rating,
    } = props


    const dispatch = useDispatch()

    const deleteCardHandler = (_id: string) => {
        dispatch(deleteCardTC(packId, _id))
    }

    const updateCardHandler = (_id: string) => {
        dispatch(updateCardTC(packId, _id))
    }
    const time = updated && updated.toString().slice(0, 10)
    return (
        <ul className={style.list}>
            <li className={style.item}>{question}</li>
            <li className={style.item}>{answer}</li>
            <li className={style.item}>{time}</li>
            <li className={style.item}>{rating}</li>
            <li>
                {ourUserId === more_id
                    &&
                    <div className={`boxBtn`}>
                        <img className={`btn btnDelete`} onClick={() => deleteCardHandler(_id)} src={deleteIcon}
                             alt={'deleteIcon'}/>
                        <img className={`btnUpdate btn`} onClick={() => updateCardHandler(_id)} src={updatePack}
                             alt={'updatePack'}/>
                    </div>
                }
            </li>
        </ul>
    );
};

