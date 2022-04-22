import React, {ChangeEvent} from 'react';
import style from './SuperModal.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {ProfileType} from "../../../dal/api";

type UpdateProfilePropsTYpe = {
    closeModal: () => void
    onClickSuperCallback: () => void
    getNewTitle: (e: ChangeEvent<HTMLInputElement>) => void
    valueTitle: string
}

export const SuperModal = (props: UpdateProfilePropsTYpe) => {
    const {closeModal, onClickSuperCallback, getNewTitle, valueTitle} = props


    const {name} = useSelector<AppRootStateType, ProfileType>(state => state.auth.profile)
    return (
        <div onClick={closeModal}>
            <div className={style.wrapper}>
                <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={style.closeBtnWrapper}>
                        <button className={style.btnClose}>
                            <span onClick={closeModal} className={style.closeIcon}>&times;</span>
                        </button>
                    </div>
                    <h3 className={style.title}>Change name</h3>
                    <div className={style.formWrapper}>
                        <input onChange={getNewTitle} className={style.input} placeholder={name} value={valueTitle}/>
                        <button onClick={onClickSuperCallback} className={style.successBtn}>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

