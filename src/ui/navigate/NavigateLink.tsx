import React from 'react';
import {NavLink} from "react-router-dom";
import style from './navigate.module.css'
import profile from '../assets/images/icons/profile.svg'
import packIcon from '../assets/images/icons/cards.svg'
import loginIcon from '../assets/images/icons/login.svg'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import logoutIcon from "../assets/images/icons/logout.svg";
import {logoutTC} from "../../bll/reducers/app-reducer";

export const NavigateLink = () => {
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.signIn.isLogin)
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutTC())
    }
    console.log(isLogin)
    return (
        <>
            <ul className={style.navigateList}>
                {!isLogin && <>
                    <li className={style.itemLink}>
                        <img className={style.decor} src={logoutIcon} alt="profileIcon"/>
                        <NavLink className={({isActive}) => `${style.link} ${isActive ? style.linkActive : ''}`}
                                 to={'/'}>Login</NavLink>
                    </li>
                    <li className={style.itemLink}>
                        <img className={style.decor} src={loginIcon} alt="profileIcon"/>
                        <NavLink className={({isActive}) => `${style.link} ${isActive ? style.linkActive : ''}`}
                                 to={'/register'}>Registration</NavLink>
                    </li>

                </>}

                {isLogin && <>
                    <div className={style.itemWrapper}>
                        <li className={style.itemLink}>
                            <img className={style.decor} src={profile} alt="profileIcon"/>
                            <NavLink className={({isActive}) => `${style.link} ${isActive ? style.linkActive : ''}`}
                                     to={'/profile'}>Profile</NavLink>
                        </li>

                        <li className={style.itemLink}>
                            <img className={style.decor} src={packIcon} alt="packIcon"/>
                            <NavLink className={({isActive}) => `${style.link} ${isActive ? style.linkActive : ''}`}
                                     to={'/packs_list'}>Packs list</NavLink>
                        </li>
                    </div>

                    <button onClick={logout} className={'logoutBtn'}>
                        <img style={{width: '30px'}} src={logoutIcon} alt=""/>
                        logout
                    </button>
                </>}
            </ul>
        </>
    );
};

