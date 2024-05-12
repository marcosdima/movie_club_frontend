import axios from "axios";
import { config } from '../utils/tokenManager';
const baseURl = '/api/groups';

const getGroups = async () => {
  const { data } = await axios.get(baseURl, config());
  return data;
};

const create = async (groupName) => {
  const { data } = await axios.post(baseURl, { groupName }, config());
  return data;
};

export default { getGroups, create };