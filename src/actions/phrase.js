import axios from "axios"
import { API } from "../contants/Url"

const post_phrase = (data, callbackSuccess, callbackError) => {
    axios.post(`https://en-p.herokuapp.com${API.PHRASE_CREATE}`, data)
        .then((success) => {
            callbackSuccess && callbackSuccess(success);
        })
        .catch((error) => {
            callbackError && callbackError(error);
        });
}

const get_phrase = (data, callbackSuccess, callbackError) => {
    axios.get(`https://en-p.herokuapp.com${API.PHRASE_VIEW}/${data}`)
        .then((success) => {
            callbackSuccess && callbackSuccess(success);
        })
        .catch((error) => {
            callbackError && callbackError(error);
        });
}

const delete_phrase = (data, callbackSuccess, callbackError) => {
    axios.delete(`https://en-p.herokuapp.com${API.PHRASE_DELETE}/${data}`)
        .then((success) => {
            callbackSuccess && callbackSuccess(success);
        })
        .catch((error) => {
            callbackError && callbackError(error);
        });
}

const put_phrase = (data, callbackSuccess, callbackError) => {
    axios.put(`https://en-p.herokuapp.com${API.PHRASE_UPDATE}`, data)
        .then((success) => {
            callbackSuccess && callbackSuccess(success);
        })
        .catch((error) => {
            callbackError && callbackError(error);
        });
}

const get_myPhrases = (data, callbackSuccess, callbackError) => {
    axios.post(`https://en-p.herokuapp.com${API.PHRASE_GETMINE}`, data)
        .then((success) => {
            callbackSuccess && callbackSuccess(success);
        })
        .catch((error) => {
            callbackError && callbackError(error);
        });
}

export { post_phrase, get_phrase, delete_phrase, put_phrase, get_myPhrases }