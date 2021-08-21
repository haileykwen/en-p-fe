import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from "../components";
import { Main, SignIn, SignUp } from '../pages';

const Routes = () => {
    return (
        <Switch>
            <PublicRoute path="/signin" component={SignIn}/>
            <PublicRoute path="/signup" component={SignUp}/>
            <PrivateRoute path="/" component={Main} />
        </Switch>
    )
}

export default Routes
