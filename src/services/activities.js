import axios from "axios";
import { config } from '../utils/tokenManager';
const baseUrl = '/api/activities';

const create = async (movieId, groupId) => {
    const { data } = await axios.post(baseUrl, { movieId, groupId }, config());
    return data;
}

export default {
    create
};