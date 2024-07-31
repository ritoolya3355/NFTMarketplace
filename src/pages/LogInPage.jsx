import React, { useState, useContext } from 'react'; // Імпорт необхідних бібліотек React
import { AuthContext } from '../AuthContext'; // Імпорт контексту аутентифікації
import './LogInPage.css'; // Імпорт стилів для сторінки входу

const LogInPage = () => {
  const [email, setEmail] = useState(''); // Стейт для збереження email
  const [password, setPassword] = useState(''); // Стейт для збереження пароля
  const [showPassword, setShowPassword] = useState(false); // Стейт для контролю видимості пароля
  const { login } = useContext(AuthContext); // Використання контексту для функції login
  const [error, setError] = useState(''); // Стейт для збереження помилки

  // Фіктивні дані користувача для перевірки автентифікації
  const fakeUser = {
    email: 'test@example.com',
    password: 'password123'
  };

  // Функція для обробки форми входу
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Перевірка введених даних з фіктивними даними користувача
    if (email === fakeUser.email && password === fakeUser.password) {
      login(); // Виклик функції login з контексту
      setError(''); // Скидання помилки
    } else {
      setError('Invalid email or password'); // Встановлення помилки
    }
  };

  // Функція для зміни видимості пароля
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='login-form-div'>
          <label className='login-label' htmlFor="email">Email</label>
          <input
            className='login-input'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='login-form-div password-div'>
          <label className='login-label' htmlFor="password">Password</label>
          <div className='password-input-container'>
            <input
              className='login-input'
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '👁️' : '🙈'}
            </button>
          </div>
        </div>
        {error && <p className='error-message'>{error}</p>} {/* Відображення помилки, якщо є */}
        <button className="btn-login" type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LogInPage;
