import React, {ChangeEvent} from 'react';
import style from './SuperModal.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {ProfileType} from "../../../dal/api";

type UpdateProfilePropsTYpe = {
    closeModal: () => void
    onClickSuperCallback?: () => void
    getNewTitle?: (e: ChangeEvent<HTMLInputElement>) => void
    valueTitle?: string
    children?: JSX.Element | JSX.Element[];
    titleName: string
}

export const SuperModal = (props: UpdateProfilePropsTYpe) => {
    const {closeModal, onClickSuperCallback, getNewTitle, valueTitle, titleName} = props


    const {name} = useSelector<AppRootStateType, ProfileType>(state => state.auth.profile)
    return (
        <div onClick={closeModal}>
            <div className={style.wrapper}>
                <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={style.closeBtnWrapper}>
                        <button className={style.btnClose}>
                            <span onClick={closeModal} className={style.closeIcon}>&times;</span>
                        </button>
                    </div>
                    <h3 className={style.title}>{titleName}</h3>
                    <div className={style.formWrapper}>
                        {props.children}
                        {/*<input onChange={getNewTitle} className={style.input} placeholder={name} value={valueTitle}/>*/}
                        {/*<button onClick={onClickSuperCallback} className={style.successBtn}>Ok</button>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

// type ModalDeleteType = {
//     closeModal: () => void
//     onClickSuperCallback: () => void
//     children?: JSX.Element|JSX.Element[];
// }
// export const SuperModalDelete = (props: ModalDeleteType) => {
//     const {closeModal, onClickSuperCallback} = props
//
//
//     return (
//         <div onClick={closeModal}>
//             <div className={style.wrapper}>
//                 <div className={style.modal} onClick={(e) => e.stopPropagation()}>
//                     <div className={style.closeBtnWrapper}>
//                         <button className={style.btnClose}>
//                             <span onClick={closeModal} className={style.closeIcon}>&times;</span>
//                         </button>
//                     </div>
//                     <h3 className={style.title}>Delete Pack</h3>
//                     <div className={style.formWrapper}>
//                         {props.children}
//                         {/*<button onClick={onClickSuperCallback} className={style.successBtn}>Ok</button>*/}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };