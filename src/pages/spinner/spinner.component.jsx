import React from 'react';
import './spinner.styles.scss';

const Spinner = ({ message }) => (
    <div>
        <span className="Title">{message}</span>
        <div className="showbox">
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="3" strokeMiterlimit="10"/>
                </svg>
            </div>
        </div>
    </div>
);

export default Spinner;