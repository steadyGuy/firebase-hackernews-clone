import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ForgotPassword } from './Auth/ForgotPassword';
import { Login } from './Auth/Login';
import { CreateLink } from './Link/CreateLink';
import { LinkDetail } from './Link/LinkDetail';
import { LinkList } from './Link/LinkList';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/new/1" />} />
        <Route path="/create"><CreateLink /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/forgot"><ForgotPassword /></Route>
        <Route path="/top"><LinkList /></Route>
        <Route path="/new/:page"><LinkList /></Route>
        <Route path="/link/:linkId"><LinkDetail /></Route>
      </Switch>
    </Router>
  );
}

export default App;
