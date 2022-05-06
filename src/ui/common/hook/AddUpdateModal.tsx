import React, { ChangeEvent } from 'react';

import { SuperModal } from '../SuperModal/SuperModal';

type AddUpdateModalPropsType = {
  handlerUpdate: () => void;
  overlayUpdate: boolean;
  setOverlayUpdate: (overlayUpdate: boolean) => void;
  updateName: string;
  updateNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: any;
  values?: string;
};

export const AddUpdateModal = (props: AddUpdateModalPropsType) => {
  const {
    overlayUpdate,
    setOverlayUpdate,
    handlerUpdate,
    updateName,
    updateNameChange,
    children,
    values,
  } = props;

  // close modal func
  const handleSetOverlayUpdate = () => {
    setOverlayUpdate(false);
  };

  return (
    <div className={overlayUpdate ? `overlay_shown` : `overlay_hidden`}>
      <SuperModal closeModal={handleSetOverlayUpdate} titleName={values || 'Update pack'}>
        <input
          onChange={updateNameChange}
          className="inputModal"
          placeholder={values || 'add'}
          value={updateName}
        />
        {children}
        <button onClick={handlerUpdate} className="successBtn">
          Save
        </button>
      </SuperModal>
    </div>
  );
};
