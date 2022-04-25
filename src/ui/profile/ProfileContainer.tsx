import React, {ChangeEvent, memo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {ProfileType} from "../../dal/api";
import {updateProfileTC} from "../../bll/reducers/profile-reducer";
import {Profile} from "./Profile";

export const ProfileContainer = memo(() => {
    const dispatch = useDispatch()
    const [overlay, setOverlay] = useState(false);
    const {name, avatar, ...props} = useSelector<AppRootStateType, ProfileType>(state => state.auth.profile)
    const [title, setTitle] = useState<string>(name)
    const [avatarValue, setAvatar] = useState<string>(avatar)

    //add show modal

    const showModal = () => {
        setOverlay(true)
    }
    const closeModal = () => {
        setOverlay(false)
    }
    //update profile name
    const updateProfile = () => {
        dispatch(updateProfileTC(title, avatarValue))
        closeModal()
    }

    // get new name profile
    const getNewNameProfileName = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const getNewNameProfileAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        setAvatar(e.currentTarget.value)
    }
    return (
        <div className="container">
            <Profile overlay={overlay}
                     closeModal={closeModal}
                     getNewNameProfileName={getNewNameProfileName}
                     updateProfile={updateProfile}
                     title={title}
                     name={name}
                     avatar={avatar}
                     showModal={showModal}
                     avatarValue={avatarValue}
                     getNewNameProfileAvatar={getNewNameProfileAvatar}
            />
        </div>
    )
})


