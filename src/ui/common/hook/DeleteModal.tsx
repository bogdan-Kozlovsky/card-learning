import React from 'react';

import { SuperModal } from '../SuperModal/SuperModal';

type propsType = {
  value: boolean;
  setValue: (value: boolean) => void;
  handlerDeletePack: () => void;
};
export const DeleteModal = (props: propsType) => {
  const { value, setValue, handlerDeletePack } = props;

  // close modal func
  const closeModal = () => {
    setValue(false);
  };
  return (
    <div>
      <div className={value ? `overlay_shown` : `overlay_hidden`}>
        <SuperModal
          closeModal={closeModal}
          onClickSuperCallback={handlerDeletePack}
          titleName="Delete Pack"
        >
          <button onClick={handlerDeletePack} className="successBtn">
            Ok
          </button>
        </SuperModal>
      </div>
    </div>
  );
};
