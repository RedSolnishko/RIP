import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Comp/Header';
import AuthPage from './Comp/AuthPage';

export default function MyApp() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <Route path="/" exact>
            <h1>Заходят как-то раз в бар...</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}