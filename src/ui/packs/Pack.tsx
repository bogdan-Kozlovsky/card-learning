import React from 'react';
import deleteIcon from './../assets/images/deleteIcon.svg'
import updatePackName from './../assets/images/updatePackName.svg'
import {deletePackTC, updatePackNameTC} from "../../bll/reducers/packs-reducer";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";

type propsType = {
    name: string | null
    cards: number | null
    lastUpdated: Date | null
    author: string | null
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

    return (
        <div style={{border: '1px orange solid'}}>
            <NavLink to={`/packs_list_cards/${packId}`}>{name}</NavLink>
            <p>{cards}</p>
            <p>{lastUpdated}</p>
            <p>{author}</p>
            <div>
                {key === userId ? <img onClick={handlerUpdatePackName} style={{width: "5%",cursor:"pointer"}} src={updatePackName} alt=""/> : null}
            </div>
            <div>

                {key === userId ? <img onClick={handlerDeletePack} style={{width: "5%",cursor:"pointer"}} src={deleteIcon} alt=""/> : null}
            </div>
        </div>
    );
};

