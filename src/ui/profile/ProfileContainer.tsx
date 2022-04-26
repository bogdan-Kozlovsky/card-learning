import React, {ChangeEvent, memo, useState} from 'react';
import {useDispatch} from "react-redux";
import {updateProfileTC} from "../../bll/reducers/profile-reducer";
import {Profile} from "./Profile";
import {selectAuthForgotProfile} from "../../bll/selectors";
import {useAppSelector} from "../common/hook/hook";

export const ProfileContainer = memo(() => {
    const dispatch = useDispatch()
    const [overlay, setOverlay] = useState(false);
    const {name, avatar, email, ...props} = useAppSelector(selectAuthForgotProfile)
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
        <>
            <Profile overlay={overlay}
                     closeModal={closeModal}
                     getNewNameProfileName={getNewNameProfileName}
                     updateProfile={updateProfile}
                     title={title}
                     name={name}
                     email={email}
                     avatar={avatar}
                     showModal={showModal}
                     avatarValue={avatarValue}
                     getNewNameProfileAvatar={getNewNameProfileAvatar}
                     setOverlay={setOverlay}
            />
        </>
    )
})


