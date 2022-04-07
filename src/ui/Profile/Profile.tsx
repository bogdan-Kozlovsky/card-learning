import React from 'react';
import style from './profile.module.css'
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";

export const Profile = () => {
    const navigate = useNavigate()

    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
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
                            {/*<img src={avatar} alt="avatar" />*/}
                            {/*<p className={style.name}>{name}</p>*/}
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

