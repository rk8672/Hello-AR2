// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [id, setId] = useState({contextKendraID:null,contextKendraName:null});

  const setIdValue = (newId ,name) => {
    setId({contextKendraID:newId,contextKendraName:name});
  };

  
  const [apiBaseUrl, setApiBaseUrl] = useState('https://dev.api.goongoonalo.com/v1');
  useEffect(() => {
    // Check for an existing token in local storage or cookies
    const token = localStorage.getItem('userToken');
    if (token) {
      // Set the user as authenticated if a token exists
      setUser({ token });
    }
  }, []);

  const login = (userCredentials) => {
    // Implement your login logic here and set the user state.
    // After successful login, store the user's token.
    localStorage.setItem('userToken', userCredentials.token);
    setUser(userCredentials);
  };

  const logout = () => {
    // Implement your logout logic here and clear the user state and token.
    localStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, apiBaseUrl, setApiBaseUrl ,id,setIdValue}}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => React.useContext(AuthContext);


