import React, {ChangeEvent, useState} from 'react';
import openShow from '../../assets/images/openShow.svg'
import closeShow from '../../assets/images/closeShow.svg'

type propsType = {
    placeholder: string
    type: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    className: string
    value: string
    checked: boolean
}
export const SuperInput = ({
                               placeholder,
                               type,
                               onChange,
                               className,
                               value,
                           }: Partial<propsType>) => {
    return (
        <div>
            <input type={type} placeholder={placeholder} onChange={onChange} className={className} value={value}/>
        </div>
    );
};

export const SuperInputPassword = ({
                                       onChange,
                                       className,
                                       value,
                                   }: Partial<propsType>) => {
    const [shown, setShown] = useState(false);

    return (

        <div className='inputPasswordShow'>
            <input type={shown ? 'text' : 'password'} onChange={onChange}
                   className={className} value={value}/>
            {/*<button onClick={() => setShown(!shown)} className='btnShow'>*/}
                <img className='btnShow' onClick={() => setShown(!shown)} src={shown ? openShow : closeShow} alt={'open'}/>
            {/*</button>*/}
        </div>
    );
};


