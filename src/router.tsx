import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { RoutesConfig } from './config/routers';
import App from './routes/App';

const RouterConfig: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <App>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/home" />} />
            <Route exact path="/app" render={() => <Redirect to="/app/home" />} />
            <Route exact path="/app/index" render={() => <Redirect to="/app/home" />} />
            {
              RoutesConfig.map(i => {
                return (
                  <Route key={i.key} exact path={i.path} component={i.component} />
                );
              })
            }
            <Redirect to='/app/home' />
          </Switch>
        </App>
      </Router>
    </React.Fragment>
  )
};

export default connect(
  (state: any) => ({ userInfo: state.loginReducer })
)(RouterConfig);
