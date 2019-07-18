import React from 'react'
import '../styles/Header.css'
import DateFunctions from '../helpers/date'

export default function Header(props) {
    const date = new Date(props.lastMessage);
    const lastMessage = new DateFunctions().getMessageTime(date);
    return (
        <div className='header'>
            <span>My chat</span>
            <span>{props.usersAmount} participants</span>
            <span>{props.messagesAmount} messages</span>
            <span>last message {lastMessage}</span>
        </div>
    );
}

