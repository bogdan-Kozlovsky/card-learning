import React from 'react';
import {NavLink} from "react-router-dom";
import style from './navigate.module.css'
import profileIcon from '../assets/images/icons/profileIcons.svg'
import packIcon from '../assets/images/icons/cardsIcons.svg'

export const NavigateLink = () => {
    return (
        <div>
            <ul style={{display: 'flex'}}>
                <li className={style.itemLink}>
                    <NavLink className={({isActive}) => `${style.link} ${isActive ? style.linkActive : ''}`}
                             to={'/'}>Login</NavLink>
                </li>
                <li className={style.itemLink}>
                    <img className={style.decor} src={profileIcon} alt="profileIcon"/>
                    <NavLink className={({isActive}) => `${style.link} ${isActive ? style.linkActive : ''}`}
                             to={'/profile'}>Profile</NavLink>
                </li>

                <li className={style.itemLink}>
                    <img className={style.decor} src={packIcon} alt="packIcon"/>
                    <NavLink className={({isActive}) => `${style.link} ${isActive ? style.linkActive : ''}`}
                             to={'/packs_list'}>Packs list</NavLink>
                </li>
            </ul>
        </div>
    );
};

