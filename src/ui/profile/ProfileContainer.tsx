import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {ProfileType} from "../../dal/api";
import {updateProfileTC} from "../../bll/reducers/profile-reducer";
import {Profile} from "./Profile";

export const ProfileContainer = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [overlay, setOverlay] = useState(false);
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const {name, avatar, ...props} = useSelector<AppRootStateType, ProfileType>(state => state.auth.profile)
    const [title, setTitle] = useState<string>(name)

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
            <Profile overlay={overlay}
                     closeModal={closeModal}
                     getNewNameProfile={getNewNameProfile}
                     updateProfile={updateProfile}
                     title={title}
                     name={name}
                     avatar={avatar}
                     showModal={showModal}/>
        </div>
    );
};

