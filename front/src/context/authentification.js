// authentification.js

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Set logiac Auth after

  return {
    isAuthenticated,
    setIsAuthenticated,
  };
}