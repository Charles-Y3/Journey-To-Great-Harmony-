import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { registerPwaInstall } from './engine/pwaInstall';
import { registerPwaUpdates } from './engine/pwaUpdate';
import { initFolderAutoSave } from './engine/autoSaveWiring';
import { requestPersistentStorage } from './engine/persistStorage';
import App from './App';
import './styles/global.css';

registerPwaInstall();
registerPwaUpdates();
initFolderAutoSave();
void requestPersistentStorage();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
