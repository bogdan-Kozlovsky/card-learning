import React, { ChangeEvent, FC, memo } from 'react';

import style from './SuperModal.module.css';

type UpdateProfilePropsTYpe = {
  closeModal: () => void;
  onClickSuperCallback?: () => void;
  getNewTitle?: (e: ChangeEvent<HTMLInputElement>) => void;
  valueTitle?: string;
  children?: JSX.Element | JSX.Element[];
  titleName: string;
};

export const SuperModal: FC<UpdateProfilePropsTYpe> = memo(
  (props: UpdateProfilePropsTYpe) => {
    const { closeModal, titleName, children } = props;

    return (
      <div onClick={closeModal}>
        <div className={style.wrapper}>
          <div className={style.modal} onClick={e => e.stopPropagation()}>
            <div className={style.closeBtnWrapper}>
              <button className={style.btnClose}>
                <span onClick={closeModal} className={style.closeIcon}>
                  &times;
                </span>
              </button>
            </div>
            <h3 className={style.title}>{titleName}</h3>
            <div className={style.formWrapper}>{children}</div>
          </div>
        </div>
      </div>
    );
  },
);
