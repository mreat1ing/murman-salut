import { StrictMode } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom/client';

import './index.css';
import './normalize.css';
import App from './App';
import { modalStore } from './store/reducers/modalReducer';

const store = configureStore({ reducer: modalStore });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <div className="app-container">
        <App />
      </div>
    </Provider>
  </StrictMode>
);
