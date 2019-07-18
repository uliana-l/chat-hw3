import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick (e) {
    const login = e.target.parentNode.elements[0].value;
    const password = String(e.target.parentNode.elements[1].value);
    this.props.checkData({login, password});
  }

  componentDidUpdate() {
    const props = this.props;
    if (props.auth) {
      props.clear();
      props.user === '1563292183525' ? props.history.push('/users') : props.history.push('/messages');
    }
  }

  render() {
    const props = this.props;
    if (props.error) return <div>{props.error}</div>
    if (props.loading) return <div className="spinner"></div>
    return (
      <div className='row'>
        <div className='col-md-12'>Enter login and password:</div>
        <form className='col-md-4'>
          <input type='text' placeholder='login'/>
          <input type='password'placeholder='password'/>

          <button type='button' onClick={this.onClick}>Войти</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      auth: state.login.auth,
      user: state.login.login,
      token: state.login.user,
      loading: state.login.loading,
      error: state.login.error
  }
};

const mapDispatchToProps = {
  ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);