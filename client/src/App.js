import React from 'react';
import Chat from './chat/index';
import { Switch, Route } from 'react-router-dom';
import Login from './login';
import EditPage from './editPage/index';
import UserList from './users/index';
import UserPage from './userPage/index';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/messages' component={Chat} />
        <Route path='/message/:id' component={EditPage} />
        <Route exact path='/users' component={UserList} />
				<Route exact path="/user" component={UserPage} />
				<Route path="/user/:id" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
