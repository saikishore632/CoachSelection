// import React from 'react';
// import { createRoot } from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css';
// import App from './App';

// const rootElement = document.getElementById('root');
// createRoot(rootElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { UserProvider } from './UserContext';

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);