import React, {ChangeEvent, memo, useState} from 'react';
import {useDispatch} from "react-redux";
import {updateProfileTC} from "../../bll/reducers/profile-reducer";
import {Profile} from "./Profile";
import {selectAppInitialized, selectAuthForgotProfile, selectSignInisLogin} from "../../bll/selectors";
import {useAppSelector} from "../common/hook/hook";
import {useNavigate} from "react-router-dom";
import {PATH} from "../enums/paths";

export const ProfileContainer = memo(() => {
    console.log('ProfileContainer')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [overlay, setOverlay] = useState(false);
    const {name, avatar, email, ...props} = useAppSelector(selectAuthForgotProfile)
    const isLogin = useAppSelector(selectSignInisLogin)
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

    const initialized = useAppSelector(selectAppInitialized)
    if (!isLogin) {
        navigate(`${PATH.LOGIN}`)
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


