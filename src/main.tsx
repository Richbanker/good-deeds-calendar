import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import WebApp from '@twa-dev/sdk';

try {
  // Инициализация Telegram Web App
  WebApp.ready();
  WebApp.expand();

  // Проверяем версию и применяем фон только если поддерживается
  const sdkVersion = parseFloat(WebApp.version || '0');
  if (sdkVersion >= 6.1) {
    WebApp.setBackgroundColor('#fef3c7'); // светло-жёлтый фон
  } else {
    console.warn(`[Telegram SDK] Background color is not supported in version ${WebApp.version}`);
  }

} catch (err) {
  console.warn('[Telegram SDK] Telegram Web App SDK is not available:', err);
}

// Запуск React-приложения
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
