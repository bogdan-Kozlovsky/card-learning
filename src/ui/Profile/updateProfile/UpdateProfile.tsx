import React, {ChangeEvent, useRef, useState} from 'react';
import style from './UpdateProfile.module.css'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateProfileNameAC, updateProfileTC} from "../../../bll/reducers/profile-reducer";

const UpdateProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState<string>('')
    const inRef = useRef<HTMLInputElement>(null);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler = () =>{
        dispatch(updateProfileTC(title,''))
        return navigate('/profile')
    }

    return (
        <div>
            <div className={style.wrapper}>
                <div className={style.modal}>
                    <div className={style.closeBtnWrapper}>
                        <button className={style.btnClose}>
                            <span className={style.closeIcon}>&times;</span>
                        </button>
                    </div>
                    <h3 className={style.title}>Change name or avatar</h3>
                    <div className={style.formWrapper}>
                        {/*<input className = {style.inputUpload} ref={inRef}/>*/}
                        <button className={style.uploadBtn}>upload image</button>
                        <div className={style.previewIcon}></div>
                        <input onChange={onChangeHandler} className={style.input} placeholder='name' value={title}/>
                        <button onClick={onClickHandler} className={style.successBtn}>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;