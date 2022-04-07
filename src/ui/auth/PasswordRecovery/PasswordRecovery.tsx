import React from 'react';
import style from './passwordRecovery.module.css'

export const PasswordRecovery = () => {
    return (
        <div className="wrapperBox">
            <div className="boxMax">
                <h2 className="title">It-incubator</h2>
                <h3 className="subtitle">Forgot your password?</h3>
                <label className="inputLabel">
                    Email
                    <input
                        className='input'
                        // value={text}
                        // onChangeText={setText}
                        type="text"
                        // spanClassName={s.testSpanError}
                    />
                </label>
                <p className="description">
                    Enter your email address and we will send you further instructions{' '}
                </p>
                <button className="btnBlue">Send Instructions</button>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="detailedLink">
                    Did you remember your password?
                </a>
                <a href="#" className="linkFooter">
                    Try login in
                </a>
            </div>
        </div>
    );
};

