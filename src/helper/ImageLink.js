import React from 'react';
import { useNavigate } from 'react-router-dom';


function ImageLink({ to, src, alt }) {
    const history = useNavigate();

    function handleClick() {
        history.push(to);
    }

    return (
        <img src={src} alt={alt} onClick={handleClick} />
    );
}

export default ImageLink;

