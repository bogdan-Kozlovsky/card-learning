import React from 'react';
import {NavLink} from "react-router-dom";
import style from './navigate.module.css'
import profile from '../assets/images/icons/profile.svg'
import packIcon from '../assets/images/icons/cards.svg'
import loginIcon from '../assets/images/icons/login.svg'
import {useDispatch} from "react-redux";
import logoutIcon from "../assets/images/icons/logout.svg";
import {logoutTC} from "../../bll/reducers/app-reducer";
import {useAppSelector} from "../common/hook/hook";
import {selectSignInisLogin} from "../../bll/selectors";

export const NavigateLink = () => {
    const isLogin = useAppSelector(selectSignInisLogin)

    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutTC())
    }
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

