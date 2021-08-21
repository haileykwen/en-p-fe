import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// handle the public routes
const PublicRoute = ({ component: Component, ...rest }) => {
    const checkUser = () => {
        const check = localStorage.getItem("user_data");
        return check;
    }

    return (
        <Route
            {...rest}
            render={(props) => !checkUser() ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />}
        />
    )
}

export default PublicRoute;