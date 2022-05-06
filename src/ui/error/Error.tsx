import React, { memo } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';

import { setAppErrorAC } from '../../bll/reducers/app-reducer';
import { selectError } from '../../bll/selectors';
import { useAppSelector } from '../common/hook/hook';

const Alert = (props: AlertProps) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);

export const ErrorSnackbar = memo(() => {
  const dispatch = useDispatch();

  /// /selector
  const error = useAppSelector(selectError);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorAC(null));
  };

  const isOpen = error !== null;

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
});
