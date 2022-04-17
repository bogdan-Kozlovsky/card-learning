import React from 'react';
import style from './profile.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {ProfileType} from "../../dal/api";

export const Profile = () => {
    const navigate = useNavigate()
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const {name, avatar, ...props} = useSelector<AppRootStateType, ProfileType>(state => state.auth.profile)
    // не удалять, после удаления не работает redirect
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.signIn.isLogin)
    // не удалять, после удаления не работает redirect


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
                            <p className={style.description}>
                                {name}
                            </p>
                        </div>
                    </div>
                    <button>
                        <NavLink to='/update-profile'>edit</NavLink>
                    </button>
                </div>
                <div className={style.rightBox}>boom</div>
            </div>
        </div>
    );
};

