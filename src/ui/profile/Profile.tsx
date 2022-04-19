import React, {ChangeEvent, useState} from 'react';
import style from './profile.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {ProfileType} from "../../dal/api";
import SuperModal from "../common/SuperModal/SuperModal";
import {updateProfileTC} from "../../bll/reducers/profile-reducer";

export const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [overlay, setOverlay] = useState(false);
    const [title, setTitle] = useState<string>('')


    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const {name, avatar, ...props} = useSelector<AppRootStateType, ProfileType>(state => state.auth.profile)
    // не удалять, после удаления не работает redirect
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.signIn.isLogin)
    // не удалять, после удаления не работает redirect


    if (!initialized) {
        navigate('/')
    }

    //add show modal
    const showModal = () => {
        setOverlay(true)
    }

    const closeModal = () => {
        setOverlay(false)
    }
    //update profile name
    const updateProfile = () => {
        dispatch(updateProfileTC(title, ''))
        closeModal()
    }

    // get new name profile
    const getNewNameProfile = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div className="container">

            <div className={style.wrapperBox}>
                <div className={style.leftBox}>
                    <div className={style.avatarBox}>
                        <div>
                            <div className={overlay ? `${style.overlay_shown}` : `${style.overlay_hidden}`}>
                                <SuperModal closeModal={closeModal} onClickSuperCallback={updateProfile} getNewTitle={getNewNameProfile} valueTitle={title}/>
                            </div>
                            <div>
                                <img className={style.avatar} src={avatar} alt="avatar"/>
                            </div>
                            <p className={style.description}>
                                {name}
                            </p>
                        </div>
                    </div>
                    <button onClick={showModal}>edit</button>
                </div>
                <div className={style.rightBox}>boom</div>
            </div>
        </div>
    );
};

