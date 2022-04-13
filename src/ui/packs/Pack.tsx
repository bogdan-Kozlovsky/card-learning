import React from 'react';

type propsType = {
    name: string | null
    cards: number | null
    lastUpdated: Date | null
    author: string | null
}

export const Pack = (props: propsType) => {
    const {
        name,
        cards,
        lastUpdated,
        author
    } = props

    return (
        <div style={{border: '1px orange solid'}}>
            <p>{name}</p>
            <p>{cards}</p>
            <p>{lastUpdated}</p>
            <p>{author}</p>
        </div>
    );
};

