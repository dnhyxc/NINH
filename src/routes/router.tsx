import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RoutesConfig from '../config/routers';
import App from '../App';

const RouterConfig: React.FC = () => {
  return (
    <div>
      <Router>
        <App>
          <Switch>
            {
              RoutesConfig.map(i => {
                return (
                  <Route key={i.key} exact path={i.path} component={i.component} />
                );
              })
            }
            <Redirect to="/app/home" />
          </Switch>
        </App>
      </Router>
    </div>
  )
};

export default RouterConfig;
