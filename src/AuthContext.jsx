import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Створюємо контекст
export const AuthContext = createContext();

// Провайдер контексту
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Отримуємо функцію навігації

  // Функція для логіну
  const login = () => {
    setIsAuthenticated(true);
    navigate('/artist'); // Перенаправляємо після логіну
  };

  // Функція для логауту
  const logout = () => {
    setIsAuthenticated(false);
    navigate('/'); // Перенаправляємо після логауту
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для використання контексту
export const useAuth = () => useContext(AuthContext);
