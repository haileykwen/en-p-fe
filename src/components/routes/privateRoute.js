import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// handle the private routes
const PrivateRoute = ({ component: Component, ...rest }) => {
    const checkUser = () => {
        const check = localStorage.getItem("user_data");
        return check;
    }

    return (
        <Route
            {...rest}
            render={(props) => checkUser() ? <Component {...props} /> : <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />}
        />
    )
}
  
export default PrivateRoute;