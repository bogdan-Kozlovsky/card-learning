import React, {ChangeEvent, memo} from 'react';
import style from './profile.module.css'
import {AddUpdateModal} from "../common/hook/AddUpdateModal";
import {useAppSelector} from "../common/hook/hook";
import {selectAppInitialized} from "../../bll/selectors";

type ProfilePropsType = {
    overlay: boolean
    closeModal: () => void
    getNewNameProfileName: (e: ChangeEvent<HTMLInputElement>) => void
    getNewNameProfileAvatar: (e: ChangeEvent<HTMLInputElement>) => void
    updateProfile: () => void
    title: string
    avatarValue: string
    name: string
    email: string | null
    avatar: string
    showModal: () => void
    setOverlay: (overlayUpdate: boolean) => void
}


export const Profile = memo((props: ProfilePropsType) => {
    const {
        overlay,
        getNewNameProfileName,
        updateProfile,
        title,
        name,
        avatar,
        showModal,
        getNewNameProfileAvatar,
        setOverlay,
        email,
    } = props

    return (
        <div className="container">
            <div className={style.wrapperBox}>
                <div className={style.box}>
                    <div className={style.avatarBox}>
                        <div>
                            <AddUpdateModal handlerUpdate={updateProfile}
                                            overlayUpdate={overlay}
                                            setOverlayUpdate={setOverlay}
                                            updateName={title}
                                            updateNameChange={getNewNameProfileName}

                            >
                                <input onChange={getNewNameProfileAvatar} className='inputModal'
                                       placeholder={'updateName'}
                                       value={avatar}/>
                            </AddUpdateModal>
                            <img className={style.avatar} src={avatar} alt="avatar"/>
                            <div>
                                <p className={style.description}>
                                    {name}
                                </p>
                                <p className={style.description}>
                                    {email}
                                </p>
                            </div>

                        </div>
                    </div>
                    <button className={`${style.btn} btnBlue`} onClick={showModal}>edit</button>
                </div>
            </div>
        </div>
    );
})

