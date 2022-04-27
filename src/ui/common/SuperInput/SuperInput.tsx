import React, {ChangeEvent, memo, useState} from 'react';
import openShow from '../../assets/images/openShow.svg'
import closeShow from '../../assets/images/closeShow.svg'

type propsType = {
    placeholder: string
    type: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    className: string
    value: string
    checked?: boolean
    children?: any
}
export const SuperInput = memo((props: Partial<propsType>) => {
    const {
        placeholder,
        type,
        onChange,
        checked,
        className,
        value,
        children,
    } = props
    return (
        <>
            {children}
            <input checked={checked} type={type} placeholder={placeholder} onChange={onChange} className={className}
                   value={value}/>
        </>
    );
})

export const SuperInputPassword = memo((props: Partial<propsType>) => {
    const {
        onChange,
        className,
        value,
    } = props
    const [shown, setShown] = useState(false);

    return (

        <div className='inputPasswordShow'>
            <input type={shown ? 'text' : 'password'} onChange={onChange}
                   className={className} value={value}/>
            <img className='btnShow' onClick={() => setShown(!shown)} src={!shown ? openShow : closeShow} alt={'open'}/>
        </div>
    );
})


