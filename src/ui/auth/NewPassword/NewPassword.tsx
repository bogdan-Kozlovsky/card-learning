import React from 'react';

export const NewPassword = () => {
    return (
        <div className="wrapperBox">
            <div className="boxMin">
                <h2 className="title">It-incubator</h2>
                <h3 className="subtitle">Create new password</h3>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="inputLabel">
                    Password
                    <input
                        className='input'
                        // value={text}
                        // onChangeText={setText}
                        type="password"
                    />
                </label>
                <p className="description">
                    {' '}
                    Create new password and we will send you further instructions to email
                </p>
                <button className="btnBlue">Create new password</button>
            </div>
        </div>
    );
};

