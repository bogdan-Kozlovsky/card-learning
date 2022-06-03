import React, { memo, useEffect } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import { useDispatch } from 'react-redux';

import { authMeTC } from '../../../bll/middlewares/auth/authMeTC';
import { selectAppInitialized, selectAppStatus } from '../../../bll/selectors';
import { useAppSelector } from '../../common/hook/hook';
import useTheme from '../../common/hook/useTheme';
import { InitializingLoader } from '../../common/InitializingLoader/InitializingLoader';
import { ErrorSnackbar } from '../../error/Error';
import { RoutesNav } from '../../navigate/RoutesNav';
import { Header } from '../Header/Header';

import style from './App.module.css';

export const App = memo(() => {
  const status = useAppSelector(selectAppStatus);
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const initialized = useAppSelector(selectAppInitialized);

  useEffect(() => {
    if (!initialized) {
      dispatch(authMeTC());
    }
  }, []);

  if (!initialized) {
    return <InitializingLoader />;
  }

  return (
    <div className={`App ${theme === 'dark' ? style.dark : style.light}`}>
      {status === 'loading' && (
        <div className={style.linearProgress}>
          <LinearProgress />
        </div>
      )}
      <Header theme={theme} toggleTheme={toggleTheme} />
      <RoutesNav />
      <ErrorSnackbar />
    </div>
  );
});
