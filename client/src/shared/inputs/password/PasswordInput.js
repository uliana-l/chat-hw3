import React, { useState }from 'react';
import PropTypes from 'prop-types';

const PasswordInput = ({ text, keyword, label, onChange }) => {
    const [isShown, setIsShown] = useState(false);
    const inputType = isShown ? 'text' : 'password';

    return (
        <div className="userpage-item">
            <label>{ label }</label>
            <input
                value={ text }
                type={ inputType }
                onChange={ e => onChange(e, keyword) }
            />
           <span onClick={() => setIsShown(!isShown) }>&#x1f441;</span>
        </div>
    );
}

PasswordInput.propTypes = {
    text: PropTypes.string,
    keyword: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default PasswordInput;