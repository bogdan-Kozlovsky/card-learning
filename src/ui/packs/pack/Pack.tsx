import React from 'react';
import deleteIcon from '../../assets/images/deleteIcon.svg'
import updatePackName from '../../assets/images/updatePackName.svg'
import {deletePackTC, updatePackNameTC} from "../../../bll/reducers/packs-reducer";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import style from './pack.module.css'

type propsType = {
    name: string | null
    cards: number | null
    lastUpdated: Date | null
    author: any
    userId: string | null
    packId: string
}
export const Pack = (props: propsType) => {
    const {
        name,
        cards,
        lastUpdated,
        author,
        userId,
        packId
    } = props

    const dispatch = useDispatch()
    const key = "6252a75c0c114900045d8083"
    const handlerDeletePack = () => {
        dispatch(deletePackTC(packId))
    }
    const handlerUpdatePackName = () => {
        dispatch(updatePackNameTC(packId))
    }
    const time = lastUpdated && lastUpdated.toString().slice(0, 10)
    console.log(lastUpdated)
    return (
        <div>
            <ul className={style.packBox}>
                <li className={style.packItem}>
                    <NavLink to={`/packs_list_cards/${packId}`} className={style.packName}>{name}</NavLink>
                </li>
                <li className={style.packItem}>
                    <p>{cards}</p>
                </li>
                <li className={style.packItem}>
                    <p>{time}</p>
                </li>
                <li className={style.packItem}>
                    <p>{author}</p>
                </li>
                <li>
                    {key === userId
                        &&
                        <div className={style.boxBtn}>
                            <img className={`${style.btn} ${style.btnUpdate}`} onClick={handlerDeletePack}
                                 src={deleteIcon}
                                 alt="deleteIcon"/>
                            <img className={`${style.btn} ${style.btnDelete}`} onClick={handlerUpdatePackName}
                                 src={updatePackName}
                                 alt="updatePackName"/>
                        </div>

                    }
                </li>
            </ul>
        </div>
    );
};

