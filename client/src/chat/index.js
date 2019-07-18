import React from 'react';
import { connect } from "react-redux";
import * as actions from './actions';
import Header from './header'
import MessageList from './messageList';
import '../styles/chat.css'
import MessageInput from './messageInput';
import LogoutBttn from '../shared/buttons/logout';
import GoToUsers from '../shared/buttons/toUsers';


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.editMessage = this.editMessage.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.toUsers = this.toUsers.bind(this);
    }

    componentDidMount() {
        const user = localStorage.getItem('user');
        this.props.fetchUser(user);
        this.props.fetchData();
    }

    getUsersAmount() {
        const data = this.props.data;
        const usersList = data.map(message => message.user);
        return new Set(usersList).size;
    }

    sendMessage(message) {
        this.props.addMessage(message);
    }

    deleteMessage(id) {
        this.props.deleteMessage(id);
    }

    onKeyDown(e) {
        if (e.keyCode === 38) {
            const props = this.props;
            const myMessages = props.data.filter(message => message.user === props.userData.name);
            const messagesAmount = myMessages.length;
            if (messagesAmount) {
                const id = myMessages[messagesAmount - 1].id;
                props.history.push(`/message/${id}`);
            }
        }
    }

    editMessage(id) {
        this.props.history.push(`/message/${id}`);
    }

    onLogout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    toUsers() {
        this.props.history.push('/users');
    }

    checkUser() {
        return this.props.userData.name === 'admin' ?
        (<GoToUsers toUsers={this.toUsers} />) : null;
    }

    render() {   
        const { data, userData, loadingData, loadingUser, error, usersAmount } = this.props;
        if (error) return (<div>{error}</div>);
        if (loadingData || loadingUser) return (<div className="spinner"></div>)
        console.log(data);
        let messagesAmount = data.length;
        return (
            <div onKeyDown={this.onKeyDown} tabIndex="0">
                <LogoutBttn
                    onLogout={this.onLogout}
                />
                {this.checkUser()}
                <Header 
                    usersAmount={usersAmount}
                    messagesAmount={messagesAmount}
                    lastMessage={data[messagesAmount - 1].created_at}
                />
                <MessageList 
                    data={data}
                    userData={userData}
                    deleteMessage={this.deleteMessage}
                    editMessage={this.editMessage}
                />
                <MessageInput 
                    userData={userData}
                    sendMessage={this.sendMessage}
                />
            </div>
        );
        
    
}

}

const mapStateToProps = state => ({
    data: state.chat.data,
    userData: state.chat.userData,
    loadingData: state.chat.loadingData,
    loadingUser: state.chat.loadingUser,
    error: state.chat.error,
    usersAmount: state.chat.usersAmount
});

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
