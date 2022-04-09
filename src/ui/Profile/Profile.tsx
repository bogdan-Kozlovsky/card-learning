import React from 'react';
import style from './profile.module.css'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {ProfileType} from "../../dal/api";
import {updateProfileTC} from "../../bll/reducers/profile-reducer";
import EditableSpan from '../common/EditableSpan/EditableSpan';

export const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // не удалять, после удаления не работает redirect
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.signIn.isLogin)
    // не удалять, после удаления не работает redirect

    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const {name, avatar, ...props} = useSelector<AppRootStateType, ProfileType>(state => state.auth.profile)
    const changeNameProfile = (name: string, avatar: string) => {
        dispatch(updateProfileTC({name, avatar}))
    }
    if (!initialized) {
        navigate('/')
    }
    return (
        <div className="container">
            <div className={style.wrapperBox}>
                <div className={style.leftBox}>
                    <div className={style.avatarBox}>
                        <div>
                            <div>
                                <img className={style.avatar} src={avatar} alt="avatar"/>
                            </div>
                            <EditableSpan titleName={name} changeNameProfile={changeNameProfile}/>
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

