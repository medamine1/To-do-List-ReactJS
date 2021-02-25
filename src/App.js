import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';

import Login from './components/login.component';
import TableToDo from './components/tableToDo.component';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/table-to-do" component={TableToDo} />
      </Switch>
    </Router>
  );
}

export default App;
