import React from 'react';
import './spinner-button.css';

const spinnerButton = ({isLoading, startClass, validation, disClass, corClass, btnType, btnName, marginTop}) => (
    <button 
    disabled={(validation === null || validation) ? false : true}
    className={!isLoading ? `submit-btn ${startClass}` : "spinner-btn"} 
        type={btnType} style={marginTop && {marginTop: 100}}>
        {isLoading ? "" : btnName}
    </button>
);

export default spinnerButton;