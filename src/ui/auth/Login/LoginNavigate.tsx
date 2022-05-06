import { FC } from 'react';

import { Navigate } from 'react-router-dom';

import { selectAppInitialized } from '../../../bll/selectors';
import { useAppSelector } from '../../common/hook/hook';
import { PATH } from '../../enums/paths';

export const LoginNavigate: FC = ({ children }) => {
  // selector
  const initialized = useAppSelector(selectAppInitialized);

  if (!initialized) return <Navigate to={PATH.LOGIN} />;
  return <div>{children}</div>;
};
