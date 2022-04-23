import React from 'react';
import style from './header.module.css'
import logo from '../../assets/images/logo.svg'
import {NavigateLink} from "../../navigate/NavigateLink";
import {logoutTC} from "../../../bll/reducers/app-reducer";
import {useDispatch} from "react-redux";
import logoutIcon from '../../assets/images/icons/logout.svg'
import {NavLink} from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutTC())
    }
    return (
        <div className={style.headerBox}>
            <div className="container">
                <div className={style.wrapperHeader}>
                    <img src={logo} alt="logo"/>
                    <NavigateLink/>
                    <button onClick={logout} className={'logoutBtn'}>
                        <img style={{width:'30px'}} src={logoutIcon} alt=""/>
                        logout
                    </button>

                    <NavLink to={'/packs_list/link'}>Link</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Header;

