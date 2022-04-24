import React from 'react';
import style from './header.module.css'
import logo from '../../assets/images/logo.svg'
import {NavigateLink} from "../../navigate/NavigateLink";

const Header = () => {

    return (
        <div className={style.headerBox}>
            <div className="container">
                <div className={style.wrapperHeader}>
                    <img src={logo} alt="logo"/>
                    <NavigateLink/>
                </div>
            </div>
        </div>
    );
};

export default Header;

