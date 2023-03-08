import React, {useContext} from 'react';

function Button ({ children, clickHandler, isDisabled, className,width }) {

    return (
        <button
            type="button"
            className={className}
            disabled={isDisabled}
            onClick={clickHandler}
            width={width}
        >
            { children }
        </button>
    );
}

export default Button;

