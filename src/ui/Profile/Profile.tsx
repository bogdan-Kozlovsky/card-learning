import React from 'react';
import style from './profile.module.css'
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {ProfileType} from "../../dal/api";
import {updateProfileTC} from "../../bll/reducers/profile-reducer";
import EditableSpan from '../common/EditableSpan/EditableSpan';
import {log} from "util";

export const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const profile = useSelector<AppRootStateType, ProfileType>(state => state.auth.profile)
    const {name, avatar, ...props} = profile
    console.log(avatar)
    const changeNameProfile = (name: string, avatar:string
    ) => {
        dispatch(updateProfileTC({name, avatar}))
    }
    // if (initialized) {
    //     navigate('/profile')
    // }
    /// bag
    // if (initialized) {
    //     return <Navigate to='/profile'/>
    // }
    return (
        <div className="container">
            <div className={style.wrapperBox}>
                <div className={style.leftBox}>
                    <div className={style.avatarBox}>
                        <div>
                            <div>
                                <img className = {style.avatar} src={avatar} alt="avatar"/>
                            </div>
                            <EditableSpan titleName={name} changeNameProfile={changeNameProfile} />
                            {/*<p className={style.description}>*/}
                            {/*    Front-end developer*/}
                            {/*</p>*/}
                        </div>
                    </div>
                </div>
                <div className={style.rightBox}>boom</div>
            </div>
        </div>
    );
};

