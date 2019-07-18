import React from 'react';

export default function GoToChat(props) {
    const onClick = () => {
        props.toChat();
    }
    return (<button onClick={onClick}>Chat</button>);
}
