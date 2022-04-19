import React, {ChangeEvent, useState} from 'react';
import style from './SuperModal.module.css'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileTC} from "../../../bll/reducers/profile-reducer";
import {AppRootStateType} from "../../../bll/store";
import {ProfileType} from "../../../dal/api";

type UpdateProfilePropsTYpe = {
    closeModal: () => void
    onClickSuperCallback: () => void
    getNewTitle:(e: ChangeEvent<HTMLInputElement>) => void
    valueTitle: string
}

const SuperModal = (props: UpdateProfilePropsTYpe) => {
    const {closeModal,onClickSuperCallback,getNewTitle,valueTitle} = props



    const {name} = useSelector<AppRootStateType, ProfileType>(state => state.auth.profile)

    return (
        <div>
            <div className={style.wrapper}>
                <div className={style.modal}>
                    <div className={style.closeBtnWrapper}>
                        <button className={style.btnClose}>
                            <span onClick={closeModal} className={style.closeIcon}>&times;</span>
                        </button>
                    </div>
                    <h3 className={style.title}>Change name or avatar</h3>
                    <div className={style.formWrapper}>
                        <button className={style.uploadBtn}>upload image</button>
                        {/*<div className={style.previewIcon}></div>*/}
                        <input onChange={getNewTitle} className={style.input} placeholder={name} value={valueTitle}/>
                        <button onClick={onClickSuperCallback} className={style.successBtn}>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperModal;