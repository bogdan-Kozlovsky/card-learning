import React, {ChangeEvent, useState} from 'react';
import style from './profile.module.css'
import SuperModal from "../common/SuperModal/SuperModal";

type ProfilePropsType = {
    overlay: boolean
    closeModal: () => void
    getNewNameProfile: (e: ChangeEvent<HTMLInputElement>) => void
    updateProfile: () => void
    title: string
    name: string
    avatar: string
    showModal: () => void
}

export const Profile = (props: ProfilePropsType) => {
    const {overlay, closeModal, getNewNameProfile, updateProfile, title, name, avatar, showModal} = props

    return (
        <div className="container">

            <div className={style.wrapperBox}>
                <div className={style.leftBox}>
                    <div className={style.avatarBox}>
                        <div>
                            <div className={overlay ? `${style.overlay_shown}` : `${style.overlay_hidden}`}>
                                <SuperModal closeModal={closeModal} onClickSuperCallback={updateProfile}
                                            getNewTitle={getNewNameProfile} valueTitle={title}/>
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

