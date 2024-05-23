let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const getToken= () => token;

const config = () => {
  return {
    headers: { 
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
};

export {
  setToken, getToken, config, 
};