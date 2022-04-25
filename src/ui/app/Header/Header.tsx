import React from 'react';
import style from './header.module.css'
import logo from '../../assets/images/logo.svg'
import {NavigateLink} from "../../navigate/NavigateLink";
import {Theme} from "../../common/theme/Theme";

type propsTyp = {
    theme: string
    toggleTheme: () => void
}
const Header = (props: propsTyp) => {

    return (
        <div className={style.headerBox}>
            <div className="container">
                <div className={style.wrapperHeader}>
                    <img src={logo} alt="logo"/>
                    <NavigateLink/>
                    <Theme theme={props.theme} toggleTheme={props.toggleTheme}/>
                </div>
            </div>
        </div>
    );
};

export default Header;

