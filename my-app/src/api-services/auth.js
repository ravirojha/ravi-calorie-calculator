import axios from "axios";
import {URL} from '../utils'

export default class Auth {

    static login = async ({email, password}) => {
        return axios.post(`${URL}/users/login`, {
            email,
            password
        })
    }

    static signup = async ({name, email, password}) => {
        return axios.post(`${URL}/users/signup`, {
            name,
            email,
            password
        })
    }
};

