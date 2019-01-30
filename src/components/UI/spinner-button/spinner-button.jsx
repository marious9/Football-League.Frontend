import React from 'react';
import './spinner-button.css';
import {Button} from '@material-ui/core/';

const spinnerButton = ({isLoading, startClass, validation, disClass, corClass, btnType, btnName, marginTop}) => (
    <div style={{textAlign: 'center'}}>
        <Button 
            color="primary"
            variant='contained'
            size="large"
            disabled={(validation === null || validation) ? false : true}
            type={btnType}
            style={marginTop ? {marginTop: 70} : {}}
            >
                {btnName}
        </Button>
    </div>
);

export default spinnerButton;