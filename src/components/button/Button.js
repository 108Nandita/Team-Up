import React from 'react';

function Button ({ children, clickHandler, isDisabled }) {
    return (
        <button
            type="button"
            disabled={isDisabled}
            onClick={clickHandler}
        >
            { children }
        </button>
    );
}

export default Button;