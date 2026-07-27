import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { registerPwaInstall } from './engine/pwaInstall';
import { registerPwaUpdates } from './engine/pwaUpdate';
import App from './App';
import './styles/global.css';

registerPwaInstall();
registerPwaUpdates();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
