import React from 'react';
import ReactDOM from 'react-dom';
import AllRoutes from './AllRoutes.js';
import "./sass/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <AllRoutes />
  </React.StrictMode>,
  document.getElementById('root')
);

