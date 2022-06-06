import axios from "axios";
import queryString from "query-string";
const url = "https://my1notes.herokuapp.com/"
const axiosClient = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});


export default axiosClient;