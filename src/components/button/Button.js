import React, {useContext} from 'react';

function Button({children, clickHandler, isDisabled, className, width, type}) {

    return (
        <button
            type={type}
            className={className}
            disabled={isDisabled}
            onClick={clickHandler}
            width={width}
        >
            {children}
        </button>
    );
}

export default Button;

