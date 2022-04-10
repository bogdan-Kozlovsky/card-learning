import React, {useRef} from 'react';
import style from './UpdateProfile.module.css'

const UpdateProfile = () => {

    const inRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <div className={style.wrapper}>
                <div className={style.modal}>
                    <div className={style.closeBtnWrapper}>
                        <button className={style.btnClose}>
                            <span className={style.closeIcon}>&times;</span>
                        </button>
                    </div>
                    <h3 className={style.title}>Change name or avatar</h3>
                    <div className={style.formWrapper}>
                        {/*<input className = {style.inputUpload} ref={inRef}/>*/}
                        <button className={style.uploadBtn}>upload image</button>
                        <div className={style.previewIcon}></div>
                        <input className={style.input} placeholder='name'/>
                        <button className = {style.successBtn}>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;