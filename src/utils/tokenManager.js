let token = null;

const setToken = newToken => {
  token = newToken;
};

const getToken = () => {
  return `Bearer ${token}` ;
};

const config = () => {
  return {
      headers: { Authorization: getToken() }
  };
};

export { setToken, getToken, config };