import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'materialize-css';

import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import AuthContext from './context/AuthContext';


function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <div className="container">
        <BrowserRouter>{routes}</BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
