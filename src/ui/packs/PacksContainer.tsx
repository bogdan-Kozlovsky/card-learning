import React, { ChangeEvent, memo, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  addPacksTC,
  doubleRangeAC,
  getPacksTC,
  getUserIdAC,
  setCurrentPageAC,
  setSearchAC,
  setSortPacksAC,
} from '../../bll/reducers/packs-reducer';
import {
  selectPacksCardsPacksTotalCount,
  selectPacksParams,
  selectProfileProfileId,
  selectSignInisLogin,
} from '../../bll/selectors';
import useDebounce, { useAppSelector } from '../common/hook/hook';
import { PATH } from '../enums/paths';

import { Packs } from './Packs';

export const PacksContainer = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // selector
  const myId = useAppSelector(selectProfileProfileId);
  const { page, sortPacks, userId, packName, min, max } =
    useAppSelector(selectPacksParams);
  const isLogin = useAppSelector(selectSignInisLogin);

  const [isOverlay, setIsOverlay] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [activeBtn, setActiveBtn] = useState<string>('all');

  // search
  const [value, setValue] = useState<string>('');
  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const closeHandler = () => {
    setValue('');
  };

  const requestCountDown = 700;
  const debounceMin = useDebounce(min, requestCountDown);
  const debounceMax = useDebounce(max, requestCountDown);
  const setSearch = useDebounce(value, requestCountDown);

  useEffect(() => {
    dispatch(getPacksTC());
  }, [page, sortPacks, userId, packName, debounceMin, debounceMax]);
  useEffect(() => {
    dispatch(setSearchAC(value));
  }, [setSearch]);

  // pagination
  const { pageCount } = useAppSelector(selectPacksParams);
  const cardPacksTotalCount = useAppSelector(selectPacksCardsPacksTotalCount);
  const totalPages = Math.ceil(cardPacksTotalCount / pageCount);
  const handlePageChange = (e: { selected: number }) => {
    const number = 1;
    const selectedPage = e.selected + number;
    dispatch(setCurrentPageAC(selectedPage));
  };

  // add Packs
  const handlerNewPacks = () => {
    dispatch(addPacksTC(title));
    setIsOverlay(false);
  };

  // sorting between own and shared Packs
  const myPacks = () => {
    setActiveBtn('own');
    dispatch(getUserIdAC(myId));
  };
  const allPacks = () => {
    setActiveBtn('all');
    dispatch(getUserIdAC(null));
  };

  // sort
  const [open, setOpen] = useState<boolean>(false);
  const requestForSorting = (num: number) => {
    const sortPacks = `${num}cardsCount`;
    dispatch(setSortPacksAC(sortPacks));
    setOpen(!open);
  };

  // add show modal
  const showModal = () => {
    setIsOverlay(true);
  };

  // get new name pack onChange
  const getNewNamePackChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  // double Range
  const onChangeRange = (value: number | [number, number]) => {
    if (Array.isArray(value)) {
      dispatch(doubleRangeAC(value[0], value[1]));
    }
  };
  const onChangeHandler = (event: ChangeEvent<{}>, value: number[] | number) => {
    onChangeRange && onChangeRange(value as number);
  };

  // learn Card
  const getLearnCard = (learnId: string | null) => {
    navigate(`${PATH.LEARN}/${learnId}`);
  };

  if (!isLogin) {
    navigate(`${PATH.LOGIN}`);
  }

  return (
    <Packs
      handlerNewPacks={handlerNewPacks}
      overlay={isOverlay}
      setOverlay={setIsOverlay}
      title={title}
      getNewNamePackChange={getNewNamePackChange}
      myPacks={myPacks}
      activeBtn={activeBtn}
      allPacks={allPacks}
      onChangeHandler={onChangeHandler}
      value={value}
      onSearchHandler={onSearchHandler}
      showModal={showModal}
      requestForSorting={requestForSorting}
      open={open}
      handlePageChange={handlePageChange}
      totalPages={totalPages}
      closeHandler={closeHandler}
      getLearnCard={getLearnCard}
    />
  );
});
