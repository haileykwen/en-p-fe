import React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from "../components";
import { Main, SignIn, SignUp } from '../pages';
import { URL } from "../contants/Url";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <PublicRoute path={URL.SIGNIN} component={SignIn}/>
                <PublicRoute path={URL.SIGNUP} component={SignUp}/>
                <PrivateRoute path={URL.SLASH} component={Main} />
            </Switch>
        </Router>
    )
}

export default Routes
