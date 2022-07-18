import axios from "axios";

export const sendGetRequest = (url, config = {}) => {
    return axios.get(url, config);
};

export const sendPostRequest = (url, data, config = {}) => {
    return axios.get(url, data, config);
};

export const sendDeleteRequest = (url, config = {}) => {
    return axios.delete(url, config);
};
