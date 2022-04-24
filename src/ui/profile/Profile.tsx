import React, {ChangeEvent} from 'react';
import style from './profile.module.css'
import {SuperModal} from "../common/SuperModal/SuperModal";

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
                            <div className={overlay ? `overlay_shown` : `overlay_hidden`}>
                                <SuperModal closeModal={closeModal} titleName={'update pack'}>
                                    <input onChange={getNewNameProfile} className='inputModal' placeholder={name}
                                           value={title}/>
                                    <button onClick={updateProfile} className='successBtn'>Save</button>
                                </SuperModal>
                            </div>
                            <div>
                                <img className={style.avatar} src={avatar} alt="avatar"/>
                            </div>
                            <p className={style.description}>
                                {name}
                            </p>
                        </div>
                    </div>
                    <button className={`${style.btn} btnBlue`} onClick={showModal}>edit</button>
                </div>
                <div className={style.rightBox}>boom</div>
            </div>
        </div>
    );
};

