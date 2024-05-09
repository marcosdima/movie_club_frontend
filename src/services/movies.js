import axios from 'axios';
const baseUrl = '/api/movies';

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const add =  async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

export default { getAll, add };