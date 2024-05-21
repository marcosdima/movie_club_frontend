import axios from "axios";
import { config } from "../utils/tokenManager";

const baseUrl = '/api';

const getAll = async (path) => {
    const { data } = await axios.get(`${baseUrl}/${path}`);
    return data;
};

const getById = async (path, id) => {
    const { data } = await axios.get(`${baseUrl}/${path}/${id}`);
    return data;
}

const create =  async (path, newObject) => {
    const { data } = await axios.post(`${baseUrl}/${path}`, newObject, config());
    return data;
};

export default { getAll, create, getById };