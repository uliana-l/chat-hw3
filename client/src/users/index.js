import React, { Component } from "react";
import { connect } from 'react-redux';
import UserItem from './UserItem';
import * as actions from './actions';
import PropTypes from 'prop-types';
import GoToChat from '../shared/buttons/toChat';
import LogoutBttn from '../shared/buttons/logout';

class UserList extends Component {
	constructor(props) {
		super(props);
		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.toChat = this.toChat.bind(this);
		this.onLogout = this.onLogout.bind(this);	
	}

	componentDidMount() {
		this.props.fetchUsers();
	}

	onEdit(id) {
		this.props.history.push(`/user/${id}`);
	}

	onDelete(id) {
		this.props.deleteUser(id);
	}

	onAdd() {
		this.props.history.push('/user');
	}

	toChat() {
		this.props.history.push('/messages');
	}

	onLogout() {
		localStorage.clear();
		this.props.history.push('/');
	}

	render() {
		if (this.props.error) return (<div>{this.props.error}</div>);
		if (this.props.loading) return (<div className="spinner"></div>)
		if (localStorage.getItem('user') !== '1563292183525') this.props.history.push('/messages');
		return (
			<div className="row">
			<LogoutBttn onLogout={this.onLogout}/>
			<GoToChat toChat={this.toChat}/>
				<div className="list-group col-10">
					{
						this.props.users.map(user => {
							return (
								<UserItem
									key={user.id}
									id={user.id}
									name={user.name}
									avatar={user.avatar}
									email={user.email}
									onEdit={this.onEdit}
									onDelete={this.onDelete}
								/>
							);
						})
					}
				</div>
				<div className="col-2">
					<button
						className="btn btn-success"
						onClick={this.onAdd}
						style={{ margin: "5px" }}
					>
						Add user
					</button>
				</div>
			</div>
		);
	}
}

UserList.propTypes = {
    userData: PropTypes.object
};

const mapStateToProps = (state) => {
	return {
		users: state.users.usersData,
		loading: state.users.loading,
		error: state.users.error
	}
};

const mapDispatchToProps = {
	...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);