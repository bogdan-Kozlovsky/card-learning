import React, {ChangeEvent, memo, useState} from 'react';
import deleteIcon from '../../assets/images/icons/delete.svg'
import updatePackName from '../../assets/images/icons/update.svg'
import {deletePackTC, updatePackNameTC} from "../../../bll/reducers/packs-reducer";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import style from './pack.module.css'
import learning from '../../assets/images/icons/learning.svg'
import {DeleteModal} from "../../common/hook/DeleteModal";
import {AddUpdateModal} from "../../common/hook/AddUpdateModal";
import {PATH} from "../../enums/paths";

type propsType = {
    name: string
    cardsCount: number | null
    lastUpdated: Date | null
    author: any
    userId: string | null
    packId: string
    ourUserId: string | null
    getLearnCard: (learnId: string | null) => void
}
export const Pack = memo((props: propsType) => {
    const {
        name,
        cardsCount,
        lastUpdated,
        author,
        userId,
        packId,
        ourUserId,
        getLearnCard
    } = props

    const dispatch = useDispatch()


    //update pack
    const [updateName, setUpdateName] = useState<string>(name)
    const [overlayUpdate, setOverlayUpdate] = useState(false);
    const updateNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateName(e.currentTarget.value)
    }
    const handlerUpdatePackName = () => {
        dispatch(updatePackNameTC(packId, updateName))
        setOverlayUpdate(false)
    }
    //open show modal
    const showModalUpdate = () => {
        setOverlayUpdate(true)
    }

    /*delete pack*/
    const [overlayDelete, setOverlayDelete] = useState(false);
    const handlerDeletePack = () => {
        dispatch(deletePackTC(packId))
    }

    const time = lastUpdated && lastUpdated.toString().slice(0, 10)

    return (
        <div className={'nthChildOdd'}>
            <DeleteModal value={overlayDelete}
                         setValue={setOverlayDelete}
                         handlerDeletePack={handlerDeletePack}/>

            <AddUpdateModal handlerUpdate={handlerUpdatePackName}
                            overlayUpdate={overlayUpdate}
                            setOverlayUpdate={setOverlayUpdate}
                            updateName={updateName}
                            updateNameChange={updateNameChange}/>
            <div>
                <ul className={style.packBox}>
                    <li className={style.packItem}>
                        <NavLink to={`${PATH.CARDS}/${packId}`} className={style.packName}>{name}</NavLink>
                    </li>
                    <li className={style.packItem}>
                        <p>{cardsCount}</p>
                    </li>
                    <li className={style.packItem}>
                        <p>{time}</p>
                    </li>
                    <li className={style.packItem}>
                        <p>{author}</p>
                    </li>
                    <li>
                        {ourUserId === userId
                            &&
                            <div className={`boxBtn`}>
                                <img className={`btn btnDelete `} onClick={() => setOverlayDelete(true)}
                                     src={deleteIcon}
                                     alt="deleteIcon"/>
                                <img className={`btn btnUpdate`} onClick={showModalUpdate}
                                     src={updatePackName}
                                     alt="updatePackName"/>
                            </div>

                        }
                        {cardsCount
                            && <img onClick={() => getLearnCard(packId)} className={`${style.learningIcons} btn`}
                                    src={learning} alt={learning}/>
                        }
                    </li>
                </ul>
            </div>
        </div>
    );
})

