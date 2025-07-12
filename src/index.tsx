import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import WebApp from '@twa-dev/sdk';

/**
 * Инициализация Telegram Web App SDK
 */
try {
  WebApp.ready();
  WebApp.expand();

  // Получаем версию SDK из WebApp
  const sdkVersion = parseFloat(WebApp.version || '0');

  if (sdkVersion >= 6.1) {
    WebApp.setBackgroundColor('#fef3c7'); // светло-жёлтый фон
  } else {
    console.warn(`[Telegram SDK] Background color is not supported in version ${WebApp.version}`);
  }

} catch (err) {
  console.warn('[Telegram SDK] Web App SDK initialization failed:', err);
}

/**
 * Запуск React-приложения
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
