import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useToken } from './hooks/useToken';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = useToken();
  return token ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" />;
};