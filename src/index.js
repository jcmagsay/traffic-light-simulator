import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApiContext, apiProvider } from './providers/Api.provider';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ApiContext.Provider value={apiProvider}>
      <App />
    </ApiContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
