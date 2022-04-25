import React, {memo} from 'react';

type propsType = {
    name: string
    onClick: () => void
    className: string
    children: JSX.Element,
}
export const SuperButton = memo(({name, ...props}: Partial<propsType>) => {
    return (
        <div>
            <button {...props}>{name}</button>
            {props.children}
        </div>
    );
})

