import React, {ChangeEvent, useState} from 'react';

type propsType = {
    placeholder: string
    type: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    className: string
    value: string
    checked: boolean
}
export const SuperInputAndLabel = ({
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

