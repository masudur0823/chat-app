import { useState } from 'react';
import jwtDecode from 'jwt-decode';

export const useToken = () => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return null;
      }
      return storedToken;
    }
    return null;
  });

  return [token, setToken];
};
