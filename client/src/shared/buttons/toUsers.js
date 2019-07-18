import React from 'react';

export default function GoToUsers(props) {
    const onClick = () => {
        props.toUsers();
    }
    return (<button onClick={onClick}>Users</button>);
}
