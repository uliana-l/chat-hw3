import React, {useState} from 'react';
import './EmailInput.css';
import PropTypes from 'prop-types';

const EmailInput = (props) => {
    const [isValid, setIsValid] = useState(true);
    
    const onBlur = (e) => {
        const isValid = e.target.value.includes('@');
        setIsValid(isValid);
    }

    const getErrorMessage = () => {
        return <span className='error-message'>That is not a valid email</span>;
    }
        
    const inputClass = isValid ? 'col-sm-9' : 'error col-sm-9';
    return (
        <div className='email-input form-group row'>
            <label className="col-sm-3 col-form-label">{ props.label }</label>
            <input
                value={ props.text }
                type={ props.type }
                className={ inputClass }
                onChange={ e => props.onChange(e, props.keyword) }
                onBlur={ onBlur }
            />
            { !isValid ? getErrorMessage() : null }
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