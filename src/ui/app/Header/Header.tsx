import React, { memo } from 'react';

import logo from '../../assets/images/logo.svg';
import { Theme } from '../../common/theme/Theme';
import { NavigateLink } from '../../navigate/NavigateLink';

import style from './header.module.css';

type propsTyp = {
  theme: string;
  toggleTheme: () => void;
};
export const Header = memo((props: propsTyp) => (
  <div className={style.headerBox}>
    <div className="container">
      <div className={style.wrapperHeader}>
        <img src={logo} alt="logo" />
        <NavigateLink />
        <Theme theme={props.theme} toggleTheme={props.toggleTheme} />
      </div>
    </div>
  </div>
));
