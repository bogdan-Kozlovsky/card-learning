import React, {ChangeEvent} from 'react';
import {SuperModal} from "../SuperModal/SuperModal";

type UpdateModalPropsType = {
    handlerUpdate: () => void
    overlayUpdate: boolean
    setOverlayUpdate: (overlayUpdate: boolean) => void
    updateName: string
    updateNameChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const UpdateModal = (props: UpdateModalPropsType) => {

    const {overlayUpdate, setOverlayUpdate, handlerUpdate, updateName,updateNameChange} = props

    const handleSetOverlayUpdate = () => {
        setOverlayUpdate(false)
    }

    return (

        <div className={overlayUpdate ? `overlay_shown` : `overlay_hidden`}>
            <SuperModal closeModal={handleSetOverlayUpdate} titleName={'Update pack'}>
                <input onChange={updateNameChange} className='inputModal' placeholder={'updateName'}
                       value={updateName}/>
                <button onClick={handlerUpdate} className='successBtn'>Save</button>
            </SuperModal>
        </div>

    );
};

