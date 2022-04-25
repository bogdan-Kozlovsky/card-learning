import React, {ChangeEvent, memo} from 'react';
import style from './profile.module.css'
import {SuperModal} from "../common/SuperModal/SuperModal";

type ProfilePropsType = {
    overlay: boolean
    closeModal: () => void
    getNewNameProfileName: (e: ChangeEvent<HTMLInputElement>) => void
    getNewNameProfileAvatar: (e: ChangeEvent<HTMLInputElement>) => void
    updateProfile: () => void
    title: string
    avatarValue: string
    name: string
    avatar: string
    showModal: () => void
}


export const Profile = memo((props: ProfilePropsType) => {
    const {
        overlay,
        closeModal,
        getNewNameProfileName,
        updateProfile,
        title,
        name,
        avatar,
        showModal,
        getNewNameProfileAvatar
    } = props

    return (
        <div className="container">

            <div className={style.wrapperBox}>
                <div className={style.leftBox}>
                    <div className={style.avatarBox}>
                        <div>
                            <div className={overlay ? `overlay_shown` : `overlay_hidden`}>
                                <SuperModal closeModal={closeModal} titleName={'update pack'}>
                                    <input onChange={getNewNameProfileName} className='inputModal' placeholder={name}
                                           value={title}/>
                                    <input onChange={getNewNameProfileAvatar} className='inputModal'
                                           placeholder={'avatar'}
                                           value={avatar}/>
                                    <button onClick={updateProfile} className='successBtn'>Save</button>
                                </SuperModal>
                            </div>
                            <img className={style.avatar} src={avatar} alt="avatar"/>
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
})

