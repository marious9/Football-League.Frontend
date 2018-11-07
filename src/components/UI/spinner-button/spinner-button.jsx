import React from 'react';
import './spinner-button.css';

const spinnerButton = ({isLoading, startClass, validation, disClass, corClass, btnType, btnName}) => (
    <button 
    disabled={(validation === null || validation) ? false : true}
    className={!isLoading ? `submit-btn ${startClass}` : "spinner-btn"} 
        type={btnType}>
        {isLoading ? "" : btnName}
    </button>
);

export default spinnerButton;