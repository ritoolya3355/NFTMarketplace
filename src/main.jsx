import React from 'react'; // Імпорт React для створення компонентів
import ReactDOM from 'react-dom/client'; // Імпорт ReactDOM для рендерінгу компонентів у DOM
import App from './App.jsx'; // Імпорт основного компонента додатка
import './index.css'; // Імпорт глобальних стилів

// Рендерінг кореневого компонента додатка
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* StrictMode допомагає знаходити потенційні проблеми у додатку */}
    <App /> {/* Основний компонент додатка */}
  </React.StrictMode>,
);
