import React, { ChangeEvent, memo, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateProfileTC } from '../../bll/middlewares/profile/updateProfileTC';
import {
  selectAuthForgotProfileAvatar,
  selectAuthForgotProfileEmail,
  selectAuthForgotProfileName,
} from '../../bll/selectors/auth';
import { selectSignInisLogin } from '../../bll/selectors/signIn';
import { useAppSelector } from '../common/hook/hook';
import { PATH } from '../enums/paths';

import { Profile } from './Profile';

export const ProfileContainer = memo(() => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const name = useAppSelector(selectAuthForgotProfileName);
  const avatar = useAppSelector(selectAuthForgotProfileAvatar);
  const email = useAppSelector(selectAuthForgotProfileEmail);
  const isLogin = useAppSelector(selectSignInisLogin);

  const [isOverlay, setIsOverlay] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(name);
  const [avatarValue, setAvatar] = useState<string>(avatar);

  // add show modal
  const showModal = () => {
    setIsOverlay(true);
  };
  const closeModal = () => {
    setIsOverlay(false);
  };

  // update profile name
  const updateProfile = () => {
    dispatch(updateProfileTC(title, avatarValue));
    closeModal();
  };

  // get new name profile and avatar (onChange) input
  const getNewNameProfileName = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const getNewNameProfileAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.currentTarget.value);
  };

  // redirects on successful logout request
  if (!isLogin) {
    navigate(`${PATH.LOGIN}`);
  }
  return (
    <Profile
      overlay={isOverlay}
      closeModal={closeModal}
      getNewNameProfileName={getNewNameProfileName}
      updateProfile={updateProfile}
      title={title}
      name={name}
      email={email}
      avatar={avatar}
      showModal={showModal}
      avatarValue={avatarValue}
      getNewNameProfileAvatar={getNewNameProfileAvatar}
      setOverlay={setIsOverlay}
    />
  );
});
