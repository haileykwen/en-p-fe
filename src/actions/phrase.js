import axios from "axios"
import { API } from "../contants/Url"

const post_createPhrase = (data, callbackSuccess, callbackError) => {
    axios.post(`https://en-p.herokuapp.com${API.PHRASE_CREATE}`, data)
        .then((success) => {
            callbackSuccess && callbackSuccess(success);
        })
        .catch((error) => {
            callbackError && callbackError(error);
        });
}

const post_getPhrase = (data, callbackSuccess, callbackError) => {
    axios.post(`https://en-p.herokuapp.com${API.PHRASE_VIEW}`, data)
        .then((success) => {
            callbackSuccess && callbackSuccess(success);
        })
        .catch((error) => {
            callbackError && callbackError(error);
        });
}

const delete_phrase = (data, callbackSuccess, callbackError) => {
    axios.post(`https://en-p.herokuapp.com${API.PHRASE_DELETE}/${data}`)
        .then((success) => {
            callbackSuccess && callbackSuccess(success);
        })
        .catch((error) => {
            callbackError && callbackError(error);
        });
}

const put_phrase = (data, callbackSuccess, callbackError) => {
    axios.post(`https://en-p.herokuapp.com${API.PHRASE_UPDATE}`, data)
        .then((success) => {
            callbackSuccess && callbackSuccess(success);
        })
        .catch((error) => {
            callbackError && callbackError(error);
        });
}

const post_getMyPhrases = (data, callbackSuccess, callbackError) => {
    axios.post(`https://en-p.herokuapp.com${API.PHRASE_GETMINE}`, data)
        .then((success) => {
            callbackSuccess && callbackSuccess(success);
        })
        .catch((error) => {
            callbackError && callbackError(error);
        });
}

export { post_createPhrase, post_getPhrase, delete_phrase, put_phrase, post_getMyPhrases }