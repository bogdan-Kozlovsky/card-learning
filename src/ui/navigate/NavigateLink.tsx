import React, { memo } from 'react';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logoutTC } from '../../bll/middlewares/app/logoutTC';
import { selectSignInisLogin } from '../../bll/selectors';
import packIcon from '../assets/images/icons/cards.svg';
import loginIcon from '../assets/images/icons/login.svg';
import logoutIcon from '../assets/images/icons/logout.svg';
import profile from '../assets/images/icons/profile.svg';
import { useAppSelector } from '../common/hook/hook';
import { PATH } from '../enums/paths';

import style from './navigate.module.css';

export const NavigateLink = memo(() => {
  const isLogin = useAppSelector(selectSignInisLogin);

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutTC());
  };
  return (
    <ul className={style.navigateList}>
      {!isLogin && (
        <>
          <li className={style.itemLink}>
            <img className={style.decor} src={logoutIcon} alt="profileIcon" />
            <NavLink
              className={({ isActive }) =>
                `${style.link} ${isActive ? style.linkActive : ''}`
              }
              to={PATH.LOGIN}
            >
              Login
            </NavLink>
          </li>
          <li className={style.itemLink}>
            <img className={style.decor} src={loginIcon} alt="profileIcon" />
            <NavLink
              className={({ isActive }) =>
                `${style.link} ${isActive ? style.linkActive : ''}`
              }
              to={PATH.REGISTRATION}
            >
              Registration
            </NavLink>
          </li>
        </>
      )}

      {isLogin && (
        <>
          <div className={style.itemWrapper}>
            <li className={style.itemLink}>
              <img className={style.decor} src={profile} alt="profileIcon" />
              <NavLink
                className={({ isActive }) =>
                  `${style.link} ${isActive ? style.linkActive : ''}`
                }
                to={PATH.PROFILE}
              >
                Profile
              </NavLink>
            </li>

            <li className={style.itemLink}>
              <img className={style.decor} src={packIcon} alt="packIcon" />
              <NavLink
                className={({ isActive }) =>
                  `${style.link} ${isActive ? style.linkActive : ''}`
                }
                to={PATH.PACKS}
              >
                Packs list
              </NavLink>
            </li>
          </div>

          <button onClick={logout} className="logoutBtn">
            <img style={{ width: '30px' }} src={logoutIcon} alt="" />
            logout
          </button>
        </>
      )}
    </ul>
  );
});
