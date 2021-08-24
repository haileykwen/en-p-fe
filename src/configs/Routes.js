import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from "../components";
import { Main, SignIn, SignUp } from '../pages';
import { URL } from "../contants/Url";

const Routes = () => {
    return (
        <Switch>
            <PrivateRoute path={URL.SLASH} component={Main} />
            <PublicRoute path={URL.SIGNIN} component={SignIn}/>
            <PublicRoute path={URL.SIGNUP} component={SignUp}/>
        </Switch>
    )
}

export default Routes
