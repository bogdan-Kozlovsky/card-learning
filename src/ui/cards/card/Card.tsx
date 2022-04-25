import React, {ChangeEvent, useState} from 'react';
import style from "./card.module.css";
import deleteIcon from "../../assets/images/icons/delete.svg";
import updatePack from "../../assets/images/icons/update.svg";
import {deleteCardTC, updateCardTC} from "../../../bll/reducers/cards-reducer";
import {useDispatch} from "react-redux";
import {SuperModal} from "../../common/SuperModal/SuperModal";
import {updatePackNameTC} from "../../../bll/reducers/packs-reducer";

type propsType = {
    question: string
    answer: string
    updated: Date
    packId: string | undefined
    _id: string
    more_id: any
    ourUserId: string | null
    grade: number
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
        grade,
    } = props


    const dispatch = useDispatch()

    const deleteCardHandler = (_id: string) => {
        dispatch(deleteCardTC(packId, _id))
    }

    // const updateCardHandler = (_id: string) => {
    //     dispatch(updateCardTC(packId, _id))
    // }
    const time = updated && updated.toString().slice(0, 10)

// modal
    const [updateName, setUpdateName] = useState<string>(question)
    const [overlayUpdate, setOverlayUpdate] = useState(false);
    //open show modal
    const showModalUpdate = () => {
        setOverlayUpdate(true)
    }
    //close show modal
    const closeModalUpdate = () => {
        setOverlayUpdate(false)
    }
    const updateNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateName(e.currentTarget.value)
    }
    const handlerUpdatePackName = () => {
        dispatch(updateCardTC(packId, _id, updateName))
        setOverlayUpdate(false)
    }
    return (
        <>
            <div className={overlayUpdate ? `overlay_shown` : `overlay_hidden`}>
                <SuperModal closeModal={closeModalUpdate} titleName={'Update pack'}>
                    <input onChange={updateNameChange} className='inputModal' placeholder={'updateName'}
                           value={updateName}/>
                    <button onClick={handlerUpdatePackName} className='successBtn'>Save</button>
                </SuperModal>
            </div>

            <ul className={style.list}>
                <li className={style.item}>{question}</li>
                <li className={style.item}>{answer}</li>
                <li className={style.item}>{time}</li>
                <li className={style.item}>{rating}</li>
                <li>
                    {ourUserId === more_id
                        &&
                        <div className={`boxBtn`}>
                            <img className={style.btn} onClick={() => deleteCardHandler(_id)} src={deleteIcon}
                                 alt={'deleteIcon'}/>
                            <img className={style.btn} onClick={showModalUpdate} src={updatePack}
                                 alt={'updatePack'}/>
                        </div>
                    }
                </li>
            </ul>
        </>

    );
};

