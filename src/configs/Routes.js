import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main, SignIn, SignUp } from '../pages';

const Routes = () => {
    return (
        <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" exact component={Main} />
        </Switch>
    )
}

export default Routes
