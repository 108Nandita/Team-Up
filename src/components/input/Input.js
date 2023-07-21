import React from 'react';

function Input({ label, name, type, value, onChange, error }) {
    return (
        <div className="form-group">
            <label htmlFor={name} style={{ display: 'inline-block', width: '140px' }}>
                {label}:
            </label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                style={{ display: 'inline-block' }}
            />
            {error && <p className="form-warning">{error}</p>}
        </div>
    );
}

export default Input;