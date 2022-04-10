import React from 'react';

type propsType = {
    name: string
    onClick: () => void
    className: string
}
export const SuperButton = ({name, ...props}: Partial<propsType>) => {
    return (
        <div>
            <button {...props}>{name}</button>
        </div>
    );
};

