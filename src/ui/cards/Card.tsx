import React from 'react';

type propsType = {
    question: string
    answer: string
    updated: Date
}

export const Card = (props: propsType) => {
    const {
        question,
        answer,
        updated,
    } = props
    return (
        <ul>
            <li>{question}</li>
            <li>{answer}</li>
            <li>{updated}</li>
        </ul>
    );
};

