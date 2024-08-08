import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import './index.css';
import './normalize.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <div className="app-container">
      <App />
    </div>
  </StrictMode>
);
