import React from 'react'
import '../styles/MessageInput.css'
import DateFunctions from '../helpers/date'

export default class MessageInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }  

    onClick() {
        if (this.state.value.trim() === '') return;
        const userData = this.props.userData;
        const message = {
            user: userData.name,
            avatar: userData.avatar,
            created_at: new DateFunctions().formatDateForMessage(new Date()),
            message: this.state.value,
            id: String(new Date().getTime())
        };
        this.props.sendMessage(message);
        this.setState({ value: '' });
    }

    render() {
        return (
            <div className="message-input">
                <form>
                    <input type='text' value={this.state.value} onChange={this.onChange}></input>
                    <button type='button' onClick={this.onClick}>send</button>
                </form>
            </div>
        );
    }
}