import React from 'react';
import ReactDOM from 'react-dom/client';
import reducer, { initialState } from "./reducer";
import { StateProvider } from './StateProvider';

import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
