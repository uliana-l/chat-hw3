import React, { Component } from "react";
import { connect } from 'react-redux'
import * as actions from './actions';
import { addUser, updateUser } from '../users/actions';
import TextInput from '../shared/inputs/text/TextInput';
import PasswordInput from '../shared/inputs/password/PasswordInput';
import EmailInput from '../shared/inputs/email/EmailInput';
import userFormConfig from '../shared/config/userFormConfig';
import defaultUserConfig from '../shared/config/defaultUserConfig';
import PropTypes from 'prop-types';
import '../styles/userPage.css'

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = this.getDefaultUserData();
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.fetchUser(this.props.match.params.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.id !== nextProps.userData.id && nextProps.match.params.id) {
            this.setState({
                ...nextProps.userData
            })
        }
    }

    onCancel() {
        this.setState(this.getDefaultUserData());
        this.props.history.push('/users');
    }

    onSave() {
        if (this.state.id) {
            this.props.updateUser(this.state.id, this.state);
        } else {
            this.props.addUser(this.state);
        }
        this.setState(this.getDefaultUserData());
        this.props.history.push('/users');
    }

    onChangeData(e, keyword) {
        const value = e.target.value;
        this.setState(
            {
                ...this.state,
                [keyword]: value
            }
        );
    }

    getDefaultUserData() {
        return {
            ...defaultUserConfig
        };
    }

    getInput(data, { label, type, keyword }, index) {
        switch (type) {
            case 'text':
                return (
                    <TextInput
                        key={index}
                        label={label}
                        type={type}
                        text={data[keyword]}
                        keyword={keyword}
                        onChange={this.onChangeData}
                    />
                );
            case 'email':
                return (
                    <EmailInput
                        key={index}
                        label={label}
                        type={type}
                        text={data[keyword]}
                        keyword={keyword}
                        onChange={this.onChangeData}
                    />
                );
            case 'password':
                return (
                    <PasswordInput
                        key={index}
                        label={label}
                        type={type}
                        text={data[keyword]}
                        keyword={keyword}
                        onChange={this.onChangeData}
                    />
                );
            default:
                return null;
        }
    }

    render() {
        if (this.props.error) return (<div>{this.props.error}</div>);
        if (this.props.loading) return (<div className="spinner"></div>);
        if (localStorage.getItem('user') !== '1563292183525') this.props.history.push('/messages');
        const data = this.state;

        return (          
            <div className="userPage">
             <form>
                <div>
                    <h5>Add user</h5>
                </div>
                <div>
                    {
                        userFormConfig.map((item, index) => this.getInput(data, item, index))
                    }
                </div>
                <div>
                    <button className="btn btn-secondary" onClick={this.onCancel}>Cancel</button>
                    <button className="btn btn-primary" onClick={this.onSave}>Save</button>
                </div>
            </form>
            </div>
            );
    }
}

UserPage.propTypes = {
    userData: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        userData: state.userPage.userData,
        loading: state.userPage.loading,
        error: state.userPage.error
    }
};

const mapDispatchToProps = {
    ...actions,
    addUser,
    updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);