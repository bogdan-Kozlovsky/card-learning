import React, { ChangeEvent, memo, useState } from 'react';

import { useDispatch } from 'react-redux';

import { deleteCardTC } from '../../../bll/middlewares/cards/deleteCardTC';
import { updateCardTC } from '../../../bll/middlewares/cards/updateCardTC';
import deleteIcon from '../../assets/images/icons/delete.svg';
import updatePack from '../../assets/images/icons/update.svg';
import { AddUpdateModal } from '../../common/hook/AddUpdateModal';
import { DeleteModal } from '../../common/hook/DeleteModal';

import style from './card.module.css';

type propsType = {
  question: string;
  answer: string;
  updated: Date;
  packId: string | undefined;
  _id: string;
  moreId: any;
  myUserId: string | null;
  grade: number;
};

export const Card = memo((props: propsType) => {
  const { question, answer, updated, packId, _id, moreId, myUserId, grade } = props;

  const dispatch = useDispatch();

  // /*delete card*/
  const [overlayDelete, setOverlayDelete] = useState(false);
  const handlerDeletePack = () => {
    dispatch(deleteCardTC(packId, _id));
  };

  const start = 0;
  const end = 10;
  const time = updated && updated.toString().slice(start, end);

  // modal
  const [updateName, setUpdateName] = useState<string>(question);
  const [overlayUpdate, setOverlayUpdate] = useState(false);
  // open show modal
  const showModalUpdate = () => {
    setOverlayUpdate(true);
  };

  const updateNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateName(e.currentTarget.value);
  };
  const handlerUpdatePackName = () => {
    dispatch(updateCardTC(packId, _id, updateName));
    setOverlayUpdate(false);
  };
  return (
    <div className="nthChildOdd">
      <DeleteModal
        value={overlayDelete}
        setValue={setOverlayDelete}
        handlerDeletePack={handlerDeletePack}
      />
      <AddUpdateModal
        overlayUpdate={overlayUpdate}
        setOverlayUpdate={setOverlayUpdate}
        handlerUpdate={handlerUpdatePackName}
        updateName={updateName}
        updateNameChange={updateNameChange}
      />

      <ul className={style.list}>
        <li className={style.item}>{question}</li>
        <li className={style.item}>{answer}</li>
        <li className={style.item}>{time}</li>
        <li className={style.item}>{grade}</li>
        <li>
          {myUserId === moreId && (
            <div className="boxBtn">
              <img
                className={style.btn}
                onClick={() => setOverlayDelete(true)}
                src={deleteIcon}
                alt="deleteIcon"
              />
              <img
                className={style.btn}
                onClick={showModalUpdate}
                src={updatePack}
                alt="updatePack"
              />
            </div>
          )}
        </li>
      </ul>
    </div>
  );
});
