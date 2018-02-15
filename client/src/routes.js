import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import history from './helpers/history';
import Auth from './services/Auth';
import App from './components/App/App';
import Home from './components/App/Home';
import Login from './components/User/Login';
import NotFound from './components/App/NotFound';
import Goals from './components/Goals/Goals';
import Profile from './components/User/Profile';
import Callback from './components/User/Callback';
 
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

const Routes = () => {
    return (
        <Router history={history}>
            <App auth={auth}>
                <Grid id="body">
                    <Switch>
                        <Route exact path="/" render={(props) => <Home  />} />
                        <Route path="/login" render={(props) => <Login auth={auth} {...props} />} />
                        <Route path="/goals" render={(props) => (!auth.isAuthenticated() 
                            ? (<Redirect to="/login" />) 
                            : (<Goals auth={auth} {...props} />)
                        )} />
                        <Route path="/profile" render={(props) => <Profile auth={auth} {...props} />} />
                        <Route path="/callback" render={(props) => {
                            handleAuthentication(props);
                            return <Callback {...props} />
                        }} />
                        <Route component={NotFound} />
                    </Switch>
                </Grid>
            </App>
        </Router>
    );
}

export default Routes;