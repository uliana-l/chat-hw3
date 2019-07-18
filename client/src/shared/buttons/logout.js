import React from 'react';

export default function LogoutBttn(props) {
    const onClick = () => {
        props.onLogout();
    }
    return (<button onClick={onClick}>Logout</button>);
}

