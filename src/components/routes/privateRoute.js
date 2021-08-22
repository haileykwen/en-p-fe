import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { URL } from "../../contants/Url";

// handle the private routes
const PrivateRoute = ({ component: Component, ...rest }) => {
    const checkUser = () => {
        const check = localStorage.getItem("user_data");
        return check;
    }

    return (
        <Route
            {...rest}
            render={(props) => checkUser() ? <Component {...props} /> : <Redirect to={{ pathname: `${URL.SIGNIN}`, state: { from: props.location } }} />}
        />
    )
}
  
export default PrivateRoute;