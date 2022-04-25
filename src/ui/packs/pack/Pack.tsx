import React, {ChangeEvent, memo, useState} from 'react';
import deleteIcon from '../../assets/images/icons/delete.svg'
import updatePackName from '../../assets/images/icons/update.svg'
import {deletePackTC, updatePackNameTC} from "../../../bll/reducers/packs-reducer";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import style from './pack.module.css'
import {SuperModal} from "../../common/SuperModal/SuperModal";
import learning from '../../assets/images/icons/learning.svg'
import {DeleteModal} from "../../common/hook/DeleteModal";

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
    //close show modal
    const closeModalUpdate = () => {
        setOverlayUpdate(false)
    }

    /*delete pack*/
    const [overlayDelete, setOverlayDelete] = useState(false);
    const handlerDeletePack = () => {
        dispatch(deletePackTC(packId))
    }

    const time = lastUpdated && lastUpdated.toString().slice(0, 10)

    return (
        <div>
            <DeleteModal value={overlayDelete} setValue={setOverlayDelete} handlerDeletePack={handlerDeletePack}/>

            {/*update pack*/}
            <div className={overlayUpdate ? `overlay_shown` : `overlay_hidden`}>
                <SuperModal closeModal={closeModalUpdate} titleName={'Update pack'}>
                    <input onChange={updateNameChange} className='inputModal' placeholder={updateName}
                           value={updateName}/>
                    <button onClick={handlerUpdatePackName} className='successBtn'>Save</button>
                </SuperModal>
            </div>
            <ul className={style.packBox}>
                <li className={style.packItem}>
                    <NavLink to={`/packs_list_cards/${packId}`} className={style.packName}>{name}</NavLink>
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
                    {/*{cardsCount && <NavLink onClick={a} to={`/packs_list/link`}>Learn</NavLink>}*/}
                    {cardsCount && <img onClick={() => getLearnCard(packId)} className={`${style.learningIcons} btn`}
                                        src={learning} alt={learning}/>
                    }
                </li>
            </ul>

        </div>
    );
})

