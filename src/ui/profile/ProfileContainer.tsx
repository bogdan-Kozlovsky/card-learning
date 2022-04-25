import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {ProfileType} from "../../dal/api";
import {updateProfileTC} from "../../bll/reducers/profile-reducer";
import {Profile} from "./Profile";

// const withAuthGuard = (Component) => {
//     const WrappedComponent = (props) => {
//         //selector authStatus
//         //if status === intial retutrn null
//         //if status === unLogged -->  redirect to login
//        return <Component/>
//     }
//
//     return WrappedComponent
//
// }

// type propsType = {
//     initialized: InitialStatusType
// }

// export function withAuthRedirect(Component: JSX.Element) {
//
//     function RedirectComponent(props: propsType) {
//         // const initialized = useSelector<AppRootStateType, InitialStatusType>(state => state.app.initialized)
//
//         let {initialized, ...restProps} = props
//
//         if (initialized === 'close') return null
//         if (initialized === 'login') return <Navigate to='/'/>
//         if (initialized === 'profile') return <Navigate to='/profile'/>
//         return <Component {...restProps}/>
//     }
//
//     return (RedirectComponent)
// }

// export const withAuthGuard( ProfileContainer = () => {
const ProfileContainer = () => {
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
}

// export default withAuthRedirect(<ProfileContainer/>)
export default ProfileContainer
// }
// )
// ;

