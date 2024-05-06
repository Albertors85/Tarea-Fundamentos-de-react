import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import storage from './util/storage.js';
import { authHeader } from './api/client.js';
import {AuthContextProvider} from './pages/login/context.js';
import { BrowserRouter } from 'react-router-dom';

const accessToken = storage.get('auth');
if(accessToken){
  authHeader(accessToken)
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>

      <AuthContextProvider isDefaultLogged={!!accessToken}>
        <App/>
      </AuthContextProvider>
      
    </BrowserRouter>
    

  </React.StrictMode>
);


