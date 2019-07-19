import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ text, type, keyword, label, onChange }) => {
    const onChangeEvent = e => onChange(e, keyword);
    return (
        <div className="userpage-item">
            <label>{ label }</label>
            <input
                value={ text }
                type={ type }
                onChange={ onChangeEvent }
            />
        </div>
    );
}

TextInput.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    keyword: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default TextInput;