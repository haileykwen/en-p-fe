import axios from "axios";
import { API } from "../contants/Url";

const post_signup = (data, callbackSuccess, callbackError) => {
    axios.post(`http://en-p.herokuapp.com${API.AUTH_SIGNUP}`, data)
        .then((success) => {
            callbackSuccess && callbackSuccess(success);
        })
        .catch((error) => {
            callbackError && callbackError(error);
        });
}

const post_signin = (data, callbackSuccess, callbackError) => {
    axios.post(`http://en-p.herokuapp.com${API.AUTH_SIGNIN}`, data)
        .then((success) => {
            callbackSuccess && callbackSuccess(success);
        })
        .catch((error) => {
            callbackError && callbackError(error);
        });
}

export { post_signup, post_signin }