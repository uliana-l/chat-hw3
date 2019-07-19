import React from 'react';
import PropTypes from 'prop-types';

const EmailInput = (props) => {    
    return (
        <div className="userpage-item">
            <label>{ props.label }</label>
            <input
                value={ props.text }
                type={ props.type }
                onChange={ e => props.onChange(e, props.keyword) }
            />
        </div>
    );
}

EmailInput.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    keyword: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default EmailInput;