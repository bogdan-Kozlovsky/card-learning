import React, { ChangeEvent, memo, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  addCardsTC,
  getCardsTC,
  setCardsCurrentPageAC,
} from '../../bll/reducers/cards-reducer';
import {
  selectCardsCardsCardsTotalCount,
  selectCardsCardsParamsPageCount,
  selectCardsCardsTotalCount,
} from '../../bll/selectors';
import { useAppSelector } from '../common/hook/hook';

import { Cards } from './Cards';

export const CardsContainer = memo(() => {
  const dispatch = useDispatch();
  const { packId } = useParams();

  // selector
  const cardsTotalCount = useAppSelector(selectCardsCardsTotalCount);
  const { pageCount } = useAppSelector(selectCardsCardsParamsPageCount);
  const cardsTotalCountNum = useAppSelector(selectCardsCardsCardsTotalCount);

  // pagination
  const totalPages = Math.ceil(cardsTotalCountNum / pageCount);
  const handlePageChange = (e: { selected: number }) => {
    const oneNumber = 1;
    const selectedPage = e.selected + oneNumber;
    dispatch(setCardsCurrentPageAC(selectedPage));
    dispatch(getCardsTC(packId));
  };

  // add show modal
  const [overlay, setOverlay] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const showModal = () => {
    setOverlay(true);
  };
  const closeModal = () => {
    setOverlay(false);
  };
  // get new name pack
  const getNewNameCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const handlerNewCard = () => {
    dispatch(addCardsTC(packId, title));
    closeModal();
  };

  useEffect(() => {
    dispatch(getCardsTC(packId));
  }, []);

  return (
    <Cards
      handlerNewCard={handlerNewCard}
      overlay={overlay}
      setOverlay={setOverlay}
      title={title}
      getNewNameCardChange={getNewNameCardChange}
      showModal={showModal}
      cardsTotalCount={cardsTotalCount}
      packId={packId}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  );
});
