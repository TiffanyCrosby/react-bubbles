import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Login from './components/Login';
import BubblePage from './components/BubblePage';
import PrivateRoute from './components/PrivateRoute';

import './styles.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">Login Here</Link>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/bubblePage" component={BubblePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
