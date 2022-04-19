import React, {ChangeEvent, useState} from 'react';
import style from './UpdateProfile.module.css'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileTC} from "../../../bll/reducers/profile-reducer";
import {AppRootStateType} from "../../../bll/store";
import {ProfileType} from "../../../dal/api";

type UpdateProfilePropsTYpe = {
    closeModal: () => void
    overlay: boolean
    setOverlay: any
}

const UpdateProfile = (props: UpdateProfilePropsTYpe) => {
    const {closeModal, overlay, setOverlay} = props
    const dispatch = useDispatch()


    const navigate = useNavigate()
    const [title, setTitle] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        dispatch(updateProfileTC(title, ''))
        closeModal()
    }

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
                        <input onChange={onChangeHandler} className={style.input} placeholder={name} value={title}/>
                        <button onClick={onClickHandler} className={style.successBtn}>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;